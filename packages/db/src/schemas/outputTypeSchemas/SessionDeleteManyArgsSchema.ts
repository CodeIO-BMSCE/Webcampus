import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { SessionWhereInputSchema } from "../inputTypeSchemas/SessionWhereInputSchema";

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export default SessionDeleteManyArgsSchema;
