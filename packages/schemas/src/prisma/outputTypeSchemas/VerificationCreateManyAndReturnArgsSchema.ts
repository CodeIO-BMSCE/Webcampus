import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { VerificationCreateManyInputSchema } from "../inputTypeSchemas/VerificationCreateManyInputSchema";

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationCreateManyInputSchema,
        VerificationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default VerificationCreateManyAndReturnArgsSchema;
