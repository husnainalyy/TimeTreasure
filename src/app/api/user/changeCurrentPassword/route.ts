import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { UserModel } from '@/models/users.model';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    try {
        const user = await UserModel.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'Invalid old password' }, { status: 400 });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save({ validateBeforeSave: false });

        return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to change password', error: error.message }, { status: 500 });
    }
}
