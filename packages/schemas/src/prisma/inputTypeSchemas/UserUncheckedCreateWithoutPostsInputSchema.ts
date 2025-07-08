import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> =
  z
    .object({
      id: z.number().int().optional(),
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .strict();

export default UserUncheckedCreateWithoutPostsInputSchema;
