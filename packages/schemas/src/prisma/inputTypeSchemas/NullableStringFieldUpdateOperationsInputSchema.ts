import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export default NullableStringFieldUpdateOperationsInputSchema;
