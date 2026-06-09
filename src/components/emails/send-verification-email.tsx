import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";

type EmailProps = {
  to: string;
  verificationUrl: string;
  userName: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({
  to,
  verificationUrl,
  userName,
}: EmailProps) => {
  await resend.emails.send({
    from: process.env.MAIL_FROM as string,
    to,
    subject: "Verify your email address",
    react: (
      <VerificationEmail
        verificationUrl={verificationUrl}
        userName={userName}
      />
    ),
  });
};

export default sendVerificationEmail;
