import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SessionCreateManyInputSchema } from "../inputTypeSchemas/SessionCreateManyInputSchema";

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default SessionCreateManyArgsSchema;
