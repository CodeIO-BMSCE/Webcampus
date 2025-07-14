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
        html: `<p>Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
      });
    },
  },
  plugins: [username()],
});
