import { dbConnect } from "@/lib/dbConnect";
import {UserModel} from "@/models/users.model";
    
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, code } = await request.json();
        console.log("Received email:", email);
        console.log("Received Code:", code);

        const decodeEmail = decodeURIComponent(email);
        const user = await UserModel.findOne({ email: decodeEmail });
        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 });
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeExpired = new Date(user.verifyCodeExpiry ?? "") < new Date();
        if (isCodeValid && !isCodeExpired) {
            user.isVerified = true;
            await user.save();
            return new Response(JSON.stringify({
                success: true,
                message: "User verified successfully"
            }), { status: 200 });
        } else if (isCodeExpired) {
            return new Response(JSON.stringify({
                success: false,
                message: "Verification code is expired, please request a new code"
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                success: false,
                message: "Incorrect verification code"
            }), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error while verifying user"
        }), { status: 400 });
    }
}
