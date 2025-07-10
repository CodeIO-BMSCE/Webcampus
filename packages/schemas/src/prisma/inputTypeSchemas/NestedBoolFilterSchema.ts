import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export default NestedBoolFilterSchema;
