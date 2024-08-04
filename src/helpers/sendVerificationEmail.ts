import { resend } from "@/lib/resend";
import VerifyEmail from "../../emails/emailVerificationTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        console.log(email)
        const responseEmail = await resend.emails.send({
            from: 'Time Tressure <no-reply@husnaindev.me>',
            to: email,
            subject: 'Verification Code || Time Tressure',
            react: VerifyEmail({ username, otp: verifyCode }),
        });
        console.log("Email Send Successfully", responseEmail);
        return { success: true, message: "Email send Successfully" }
    } catch (emailError) {
        console.log("Error sending verification email");
        return { success: false, message: "Failed to send verification email" }
    }
}
