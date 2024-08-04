import {UserModel} from '@/models/users.model';
import { dbConnect } from "@/lib/dbConnect";
import { SendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { firstName, lastName, phone, email, password } = await request.json();
        const lowerCaseEmail = email.toLowerCase();
        console.log(`Received data - First Name: ${firstName}, Last Name: ${lastName}, Phone: ${phone}, Email: ${lowerCaseEmail}, Password: ${password}`);

        if (!firstName || !lastName || !phone || !lowerCaseEmail || !password) {
            return new Response(JSON.stringify({
                success: false,
                message: "All fields are required",
            }), { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email: lowerCaseEmail });
        const verifyCode = Math.floor(Math.random() * 90000000 + 10000000).toString();
        console.log("Existing user by email:", existingUserByEmail);
        
            
        
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify({
                    success: false,
                    message: 'User already exists with this email',
                }), { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                firstName,
                lastName,
                phoneNumber: phone,
                email: lowerCaseEmail,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                timeCapsules: [],
            });
            await newUser.save();
        }

        const emailResponse = await SendVerificationEmail(lowerCaseEmail, firstName, verifyCode);
        if (!emailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: emailResponse.message
            }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "User registered successfully. Please verify your email."
        }), { status: 201 });

    } catch (error) {
        console.error("Error while registering user", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error while registering user"
        }), { status: 500 });
    }
}
