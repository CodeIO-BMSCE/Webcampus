import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { VerificationUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/VerificationUncheckedUpdateManyInputSchema";
import { VerificationUpdateManyMutationInputSchema } from "../inputTypeSchemas/VerificationUpdateManyMutationInputSchema";
import { VerificationWhereInputSchema } from "../inputTypeSchemas/VerificationWhereInputSchema";

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationUpdateManyMutationInputSchema,
        VerificationUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export default VerificationUpdateManyArgsSchema;
