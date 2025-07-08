import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .strict();

export default UserCreateManyInputSchema;
