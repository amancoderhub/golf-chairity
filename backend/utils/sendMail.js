import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetMail = async ({ email, resetUrl }) => {
    if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
        return {
            delivered: false,
            reason: "mail_not_configured"
        };
    }

    try {
        await resend.emails.send({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Reset your FairChance password",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your FairChance account. Click the button below to set a new password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Reset Password</a>
          </div>
          <p>This link will expire in 30 minutes. If you did not request this, you can ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #64748b; font-size: 14px;">FairChance - Golf for impact</p>
        </div>
      `
        });

        return { delivered: true };
    } catch (error) {
        console.error("Resend error:", error);
        return { delivered: false, reason: "api_error" };
    }
};
