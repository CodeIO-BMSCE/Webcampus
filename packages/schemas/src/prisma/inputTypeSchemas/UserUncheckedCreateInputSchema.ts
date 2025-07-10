import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostUncheckedCreateNestedManyWithoutAuthorInputSchema } from "./PostUncheckedCreateNestedManyWithoutAuthorInputSchema";
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInputSchema";

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      email: z.string(),
      password: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export default UserUncheckedCreateInputSchema;
