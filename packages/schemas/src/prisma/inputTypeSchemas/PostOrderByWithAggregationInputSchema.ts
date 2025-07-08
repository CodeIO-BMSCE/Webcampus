import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostAvgOrderByAggregateInputSchema } from "./PostAvgOrderByAggregateInputSchema";
import { PostCountOrderByAggregateInputSchema } from "./PostCountOrderByAggregateInputSchema";
import { PostMaxOrderByAggregateInputSchema } from "./PostMaxOrderByAggregateInputSchema";
import { PostMinOrderByAggregateInputSchema } from "./PostMinOrderByAggregateInputSchema";
import { PostSumOrderByAggregateInputSchema } from "./PostSumOrderByAggregateInputSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { SortOrderSchema } from "./SortOrderSchema";

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export default PostOrderByWithAggregationInputSchema;
