import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default UserCreateManyInputSchema;
