import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default SessionCreateManyInputSchema;
