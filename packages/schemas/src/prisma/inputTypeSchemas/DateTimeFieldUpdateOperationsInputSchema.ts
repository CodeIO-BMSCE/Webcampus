import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export default DateTimeFieldUpdateOperationsInputSchema;
