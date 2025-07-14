import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { AccountUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/AccountUncheckedUpdateManyInputSchema";
import { AccountUpdateManyMutationInputSchema } from "../inputTypeSchemas/AccountUpdateManyMutationInputSchema";
import { AccountWhereInputSchema } from "../inputTypeSchemas/AccountWhereInputSchema";

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> =
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

export default AccountUpdateManyAndReturnArgsSchema;
