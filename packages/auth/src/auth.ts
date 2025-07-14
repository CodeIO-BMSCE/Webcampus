import { backendEnv } from "@webcampus/common/env";
import { db } from "@webcampus/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { sendEmail } from "./send-mail";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = new URL(
        `${backendEnv().FRONTEND_URL}/auth/reset-password?token=${token}`
      );
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6fc;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 40px 30px;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        color: #333;
      }

      .logo {
        text-align: center;
        margin-bottom: 25px;
      }

      .logo img {
        width: 80px;
        height: auto;
      }

      .title {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #1a1a1a;
        margin-bottom: 10px;
      }

      .subtitle {
        font-size: 16px;
        text-align: center;
        color: #666;
        margin-bottom: 30px;
      }

      .content {
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 30px;
        color: #444;
      }

      .button-container {
        text-align: center;
        margin-bottom: 30px;
      }

      .button {
        background-color: #0052ff;
        color: #ffffff;
        padding: 14px 30px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        display: inline-block;
        transition: background 0.3s ease;
      }

      .button:hover {
        background-color: #003dcc;
      }

      .footer {
        font-size: 12px;
        text-align: center;
        color: #999;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <!-- Optional Logo -->
        <img src="https://www.bmscl.ac.in/assets/images/si/Bmseccl.png" alt="BMSCE Logo" />
      </div>
      <div class="title">Reset Your Password</div>
      <div class="subtitle">Securely change your login credentials</div>
      <div class="content">
        Hello,<br /><br />
        We received a request to reset your password for your TechVerse Campus account.<br /><br />
        If you initiated this request, please click the button below to set a new password:
      </div>
      <div class="button-container">
        <a
          href="http://localhost:3000/auth/reset-password?token=YOUR_TOKEN_HERE"
          class="button"
          target="_blank"
        >
          Reset Password
        </a>
      </div>
      <div class="content">
        If you didn't request this password reset, you can safely ignore this email.
      </div>
      <div class="footer">
        This is an automated message. Please do not reply directly.<br />
        © 2025 BMSCE Webcampus. All rights reserved.
      </div>
    </div>
  </body>
</html>
`,
      });
    },
  },
  plugins: [username()],
});
