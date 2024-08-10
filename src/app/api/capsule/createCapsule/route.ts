import { uploads } from "@/utils/cloudinary";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const cookie = request.headers.get('cookie') || '';
        const session = await getSession({ req: { headers: { cookie } } });

        if (!session || !session.user._id) {
            return NextResponse.json({ message: "User ID is missing" }, { status: 401 });
        }

        const formData = await request.formData();
        const files = formData.getAll('file') as File[];
        const { subject, message, creationDate, deliveryDate, audience, email } = Object.fromEntries(formData.entries()) as any;

        console.log("Form Data:", { subject, message, creationDate, deliveryDate, audience, email });

        if ([subject, message, audience, email].some((field) => !String(field)?.trim())) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const owner = session.user._id;
        let fileUrl: string | null = null;

        if (files.length > 0) {
            const file = files[0];
            const buffer = Buffer.from(await file.arrayBuffer());

            // Upload directly to Cloudinary
            try {
                const fileResponse = await uploads(buffer, 'Uploads'); // Pass the buffer instead of file path
                fileUrl = fileResponse.url;
            } catch (uploadError) {
                console.error("Upload error:", uploadError);
                return NextResponse.json({ message: "Failed to upload file" }, { status: 500 });
            }
        }

        const capsule = await TimeCapsule.create({
            subject,
            message,
            fileUrl: fileUrl ? [fileUrl] : [],
            creationDate,
            deliveryDate,
            audience,
            email,
            owner,
        });

        console.log(capsule);
        await UserModel.findByIdAndUpdate(owner, { $push: { timeCapsules: capsule._id } });

        const createdCapsule = await TimeCapsule.findById(capsule._id).populate('owner');
        if (!createdCapsule) {
            return NextResponse.json({ message: "Something went wrong while creating the capsule" }, { status: 500 });
        }

        return NextResponse.json({ data: createdCapsule, message: "Capsule created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating capsule:", error);
        return NextResponse.json({ message: "Failed to create capsule" }, { status: 500 });
    }
}
