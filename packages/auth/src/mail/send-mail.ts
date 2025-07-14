import { backendEnv } from "@webcampus/common/env";
import nodemailer from "nodemailer";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  /**
   * TODO: Replace with a production grade SMTP service.
   */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: backendEnv().SENDER_EMAIL,
      pass: backendEnv().GMAIL_APP_PASSWORD,
    },
  });
  const response = await transporter.sendMail({
    from: backendEnv().SENDER_EMAIL,
    to,
    subject,
    html,
  });
  return response;
};
