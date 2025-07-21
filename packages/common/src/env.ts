import { z } from "zod";

const commonEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

const frontendEnvSchema = commonEnvSchema.extend({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_FRONTEND_URL: z.url(),
});

const backendEnvSchema = commonEnvSchema.extend({
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  PORT: z.coerce.number(),
  FRONTEND_URL: z.url(),
  GMAIL_APP_PASSWORD: z.string(),
  SENDER_EMAIL: z.string(),
  ADMIN_USER_NAME: z.string(),
  ADMIN_USER_EMAIL: z.string(),
  ADMIN_USER_PASSWORD: z.string(),
  ADMIN_USER_USERNAME: z.string(),
});

/**
 * Directly using process.env in Next.js can lead to undefined values
 * because Next.js does not automatically parse environment variables.
 * So, we need to directly pass them as an object to Zod for validation.
 * https://stackoverflow.com/questions/77255954/validating-environment-variables-in-next-js-with-zod
 */
export function frontendEnv() {
  return frontendEnvSchema.parse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  });
}

export function backendEnv(env = process.env) {
  return backendEnvSchema.parse(env);
}
