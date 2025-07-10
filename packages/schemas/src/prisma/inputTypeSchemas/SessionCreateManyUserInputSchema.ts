import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export default SessionCreateManyUserInputSchema;
