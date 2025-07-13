import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { AccountWhereInputSchema } from "../inputTypeSchemas/AccountWhereInputSchema";

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export default AccountDeleteManyArgsSchema;
