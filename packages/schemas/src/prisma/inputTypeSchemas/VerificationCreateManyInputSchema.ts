import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> =
  z
    .object({
      id: z.string(),
      identifier: z.string(),
      value: z.string(),
      expiresAt: z.coerce.date(),
      createdAt: z.coerce.date().optional().nullable(),
      updatedAt: z.coerce.date().optional().nullable(),
    })
    .strict();

export default VerificationCreateManyInputSchema;
