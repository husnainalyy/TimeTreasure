import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/users.model";
import { getSession } from "next-auth/react";
import TimeCapsule from '@/models/timeCapsules.model';
import { uploads } from "@/utils/cloudinary";
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const cookie = request.headers.get('cookie') || '';
        const session = await getSession({ req: { headers: { cookie } } });

        if (!session || !session.user._id) {
            console.log("User session missing or invalid", session); // Log session details
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

            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            const filePath = path.join(uploadsDir, file.name);
            fs.writeFileSync(filePath, buffer);

            try {
                const fileResponse = await uploads(filePath, 'Images');
                fileUrl = fileResponse.url;
                fs.unlinkSync(filePath);
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
            deliveryDate: deliveryDate,
            audience,
            email,
            owner,
        });

        console.log("Created Capsule:", capsule);
        await UserModel.findByIdAndUpdate(owner, { $push: { timeCapsules: capsule._id } });

        const createdCapsule = await TimeCapsule.findById(capsule._id).populate('owner');
        if (!createdCapsule) {
            console.log("Capsule not found after creation");
            return NextResponse.json({ message: "Something went wrong while creating the capsule" }, { status: 500 });
        }
        
        return NextResponse.json({ data: createdCapsule, message: "Capsule created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating capsule:", error);
        return NextResponse.json({ message: "Failed to create capsule" }, { status: 500 });
    }
}
