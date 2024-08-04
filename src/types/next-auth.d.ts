import mongoose from 'mongoose';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string,
        username?: string,
        isVerified?: boolean,
        firstName?: string,
        lastName?: string,
        phoneNumber?: string,
        timeCapsules?: mongoose.Schema.Types.ObjectId[]
    }

    interface Session {
        user: {
            _id?: string,
            username?: string,
            isVerified?: boolean,
            firstName?: string,
            lastName?: string,
            phoneNumber?: string,
            timeCapsules?: mongoose.Schema.Types.ObjectId[]
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        username?: string,
        isVerified?: boolean,
        firstName?: string,
        lastName?: string,
        phoneNumber?: string,
        timeCapsules?: mongoose.Schema.Types.ObjectId[]
    }
}