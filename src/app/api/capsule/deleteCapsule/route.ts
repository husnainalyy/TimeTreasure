import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/dbConnect';
import TimeCapsule from '@/models/timeCapsules.model';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, res: Response) {
    await dbConnect();
    try {
        // Parse the request body
        const body = await req.json();
        const { capsuleId } = body;
        if (!capsuleId) {
            return NextResponse.json({ message: 'Capsule ID is required' }, { status: 400 });
        }
        // Delete the capsule
        const deletedCapsule = await TimeCapsule.findByIdAndDelete(capsuleId);
        if (!deletedCapsule) {
            return NextResponse.json({ message: 'Capsule not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Capsule deleted successfully' }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: 'Error deleting capsule', error: error.message }, { status: 500 });
    }
}