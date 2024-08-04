import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { UserModel } from '@/models/users.model';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { firstName, lastName, phoneNumber } = await req.json();

    if (!firstName || !lastName || !phoneNumber) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        const existingUser = await UserModel.findOne({ phoneNumber });
        if (existingUser && existingUser.email !== session.user.email) {
            return NextResponse.json({ message: 'Phone number is already registered' }, { status: 400 });
        }

        const user = await UserModel.findOneAndUpdate(
            { email: session.user.email },
            { firstName, lastName, phoneNumber },
            { new: true }
        ).select('-password');

        // Manually update the session if needed
        const updatedSession = await getServerSession(authOptions);

        return NextResponse.json({ user, message: 'Account details updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update account details' }, { status: 500 });
    }
}

