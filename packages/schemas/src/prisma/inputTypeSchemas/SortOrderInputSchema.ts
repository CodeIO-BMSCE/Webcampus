import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { NullsOrderSchema } from "./NullsOrderSchema";
import { SortOrderSchema } from "./SortOrderSchema";

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export default SortOrderInputSchema;
