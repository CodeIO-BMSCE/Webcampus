import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { SortOrderSchema } from "./SortOrderSchema";

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default PostSumOrderByAggregateInputSchema;
