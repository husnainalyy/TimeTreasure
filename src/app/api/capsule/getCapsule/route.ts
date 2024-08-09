import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnect';
import TimeCapsule from '@/models/timeCapsules.model';

interface TimeCapsuleDocument {
    _id: string;
    subject: string;
    message: string;
    fileUrl: string[];
    creationDate: string;  // Keep as string
    deliveryDate: string;  // Keep as string
    email: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    status?: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const capsules: TimeCapsuleDocument[] = await TimeCapsule.find({ owner: session.user._id }).lean();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of the day

        const updatedCapsules = capsules.map((capsule: TimeCapsuleDocument) => {
            const deliveryDate = new Date(capsule.deliveryDate);
            deliveryDate.setHours(0, 0, 0, 0); // Normalize to start of the day

            const status = deliveryDate <= today ? 'opened' : 'pending';
            return { ...capsule, status };
        });

        console.log('Updated capsules:', updatedCapsules); // Debugging log
        return NextResponse.json(updatedCapsules, { status: 200 });
    } catch (error) {
        console.error('Error fetching capsules:', error);
        return NextResponse.json({ message: 'Failed to fetch capsules' }, { status: 500 });
    }
}

