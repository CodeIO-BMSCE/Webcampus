import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { AccountCreateNestedManyWithoutUserInputSchema } from "./AccountCreateNestedManyWithoutUserInputSchema";
import { SessionCreateNestedManyWithoutUserInputSchema } from "./SessionCreateNestedManyWithoutUserInputSchema";

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    username: z.string().optional().nullable(),
    displayUsername: z.string().optional().nullable(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict();

export default UserCreateInputSchema;
