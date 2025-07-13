import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { AccountUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/AccountUncheckedUpdateManyInputSchema";
import { AccountUpdateManyMutationInputSchema } from "../inputTypeSchemas/AccountUpdateManyMutationInputSchema";
import { AccountWhereInputSchema } from "../inputTypeSchemas/AccountWhereInputSchema";

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export default AccountUpdateManyArgsSchema;
