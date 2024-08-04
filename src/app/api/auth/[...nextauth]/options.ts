import { dbConnect } from "@/lib/dbConnect";
import { NextAuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { UserModel } from "@/models/users.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: "Email", type: "text", placeholder: "enter email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();

                if (!credentials || !credentials.identifier || !credentials.password) {
                    console.error('Missing credentials:', credentials);
                    throw new Error('Email and password are required');
                }

                console.log('Received credentials:', credentials);

                try {
                    const lowerCaseIdentifier = credentials.identifier.toLowerCase();
                    const user = await UserModel.findOne({ email: lowerCaseIdentifier });

                    if (!user) {
                        console.error('User not found for email:', lowerCaseIdentifier);
                        throw new Error('User not found');
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in.');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        console.log('Incorrect password');
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    console.error('Error in authorize function:', error);
                    throw new Error(error.message);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username || '';
                token.isVerified = user.isVerified;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.phoneNumber = user.phoneNumber;
                token.timeCapsules = user.timeCapsules;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id?.toString();
                session.user.username = token.username || '';
                session.user.isVerified = token.isVerified;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.phoneNumber = token.phoneNumber;
                session.user.timeCapsules = token.timeCapsules;
            }
            return session;
        }
    },
    pages: {
        signIn: '/signIn',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};