import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostCreateNestedManyWithoutAuthorInputSchema } from "./PostCreateNestedManyWithoutAuthorInputSchema";
import { SessionCreateNestedManyWithoutUserInputSchema } from "./SessionCreateNestedManyWithoutUserInputSchema";

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    email: z.string(),
    password: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export default UserCreateInputSchema;
