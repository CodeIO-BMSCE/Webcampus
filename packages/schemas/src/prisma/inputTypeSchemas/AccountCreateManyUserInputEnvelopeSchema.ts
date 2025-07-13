import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { AccountCreateManyUserInputSchema } from "./AccountCreateManyUserInputSchema";

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AccountCreateManyUserInputSchema),
        z.lazy(() => AccountCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default AccountCreateManyUserInputEnvelopeSchema;
