import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z
    .object({
      id: z.string(),
      expiresAt: z.coerce.date(),
      token: z.string(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      ipAddress: z.string().optional().nullable(),
      userAgent: z.string().optional().nullable(),
      userId: z.string(),
    })
    .strict();

export default SessionUncheckedCreateInputSchema;
