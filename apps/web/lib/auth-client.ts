import { ac, roles } from "@webcampus/auth/rbac";
import { frontendEnv } from "@webcampus/common/env";
import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/**
 * To fix the typescript error here,
 * declaration and declarationMap are set to false based on https://github.com/better-auth/better-auth/issues/2123.
 * This is a workaround until the issue is resolved in the library.
 * This could be also because there is no option to nohoist a particular package using bun.
 * https://github.com/oven-sh/bun/issues/6850
 */
export const authClient = createAuthClient({
  baseURL: frontendEnv().NEXT_PUBLIC_API_BASE_URL,
  plugins: [
    usernameClient(),
    adminClient({
      ac,
      roles,
    }),
  ],
});
