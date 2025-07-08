import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export default BoolFieldUpdateOperationsInputSchema;
