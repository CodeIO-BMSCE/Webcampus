import { backendEnv } from "@webcampus/common/env";
import { db } from "@webcampus/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, bearer, username } from "better-auth/plugins";
import { getFileContent } from "./mail/get-file-content";
import { sendEmail } from "./mail/send-mail";
import { ac, roles } from "./rbac/permissions";

/**
 * To fix the typescript error here,
 * declaration and declarationMap are set to false based on https://github.com/better-auth/better-auth/issues/2123.
 * This is a workaround until the issue is resolved in the library.
 * This could be also because there is no option to nohoist a particular package using bun.
 * https://github.com/oven-sh/bun/issues/6850
 */
export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  trustedOrigins: [backendEnv().FRONTEND_URL],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = new URL(
        `${backendEnv().FRONTEND_URL}/reset-password?token=${token}`
      );
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: await getFileContent({
          fileName: "templates/reset-password.html",
          variables: {
            RESET_URL: resetUrl.toString(),
            USER: user.name,
          },
        }),
      });
    },
  },
  plugins: [
    bearer(),
    username(),
    admin({
      ac,
      roles,
    }),
  ],
});
