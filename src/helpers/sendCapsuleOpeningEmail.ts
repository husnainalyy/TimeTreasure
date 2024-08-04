import { Capsule } from './../app/(app)/dashboard/page';
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import TimeTreasureEmail from "../../emails/emailCapsuleOpeningTemplate";

export async function sendCapsuleOpeningEmail(
    userFirstName: string,
    capsules: Array<{
        deliveryDate: string;
        createdDate: string;
        subject: string;
    }>,
    email: string
): Promise<ApiResponse> {
    try {
        console.log("Sending email to:", email);
        const responseEmail = await resend.emails.send({
            from: 'Time Treasure <no-reply@husnaindev.me>',
            to: email,
            subject: 'Hurray! Your Capsules are now open',
            react: TimeTreasureEmail({ userFirstName, capsules }),
        });
        console.log("Email Sent Successfully", responseEmail);
        return { success: true, message: "Email sent successfully" };
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return { success: false, message: "Failed to send email" };
    }
}
