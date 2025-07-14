import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { AccountCreateManyInputSchema } from "../inputTypeSchemas/AccountCreateManyInputSchema";

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default AccountCreateManyArgsSchema;
