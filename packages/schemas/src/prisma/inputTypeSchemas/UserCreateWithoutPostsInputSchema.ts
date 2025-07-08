import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> =
  z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .strict();

export default UserCreateWithoutPostsInputSchema;
