import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default SessionCreateWithoutUserInputSchema;
