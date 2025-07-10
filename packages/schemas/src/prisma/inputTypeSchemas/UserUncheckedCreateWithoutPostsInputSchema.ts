import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInputSchema";

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export default UserUncheckedCreateWithoutPostsInputSchema;
