import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { UserModel } from '@/models/users.model';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await UserModel.findOne({ email: session.user.email }).select('-password');
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch user details' }, { status: 500 });
    }
}
