import { UserModel } from '@/models/users.model';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import TimeCapsule from '@/models/timeCapsules.model';
import { sendCapsuleOpeningEmail } from '@/helpers/sendCapsuleOpeningEmail';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        console.log("Database connected");

        // Get the current date in YYYY-MM-DD format
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        console.log("Today:", today);

        // Query for capsules with deliveryDate less than or equal to today and emailSent as false
        const capsules = await TimeCapsule.find({
            deliveryDate: { $lte: today },
            emailSent: false
        }).lean(); // Use lean() to improve performance if you don't need Mongoose documents

        console.log("Capsules found:", capsules);

        // Group capsules by user
        const userCapsulesMap = capsules.reduce((acc, capsule) => {
            const userId = capsule.owner.toString();
            if (!acc[userId]) {
                acc[userId] = [];
            }
            acc[userId].push(capsule);
            return acc;
        }, {} as Record<string, typeof capsules>);

        // Iterate through each user and send a consolidated email
        for (const [userId, userCapsules] of Object.entries(userCapsulesMap)) {
            const user = await UserModel.findById(userId);
            if (!user) {
                console.warn(`User with ID ${userId} not found`);
                continue; // Skip if user not found
            }

            const username = user.firstName;

            // Prepare email data
            const emailData = userCapsules.map(capsule => ({
                deliveryDate: new Date(capsule.deliveryDate).toISOString(),
                createdDate: new Date(capsule.createdAt).toISOString(),
                subject: capsule.subject
            }));

            // Send consolidated email
            await sendCapsuleOpeningEmail(
                username,
                emailData,
                user.email
            );

            // Update emailSent status for all capsules
            await TimeCapsule.updateMany(
                { _id: { $in: userCapsules.map(capsule => capsule._id) } },
                { $set: { emailSent: true } }
            );
        }

        return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}