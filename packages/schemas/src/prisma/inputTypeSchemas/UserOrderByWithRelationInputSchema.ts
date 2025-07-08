import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostOrderByRelationAggregateInputSchema } from "./PostOrderByRelationAggregateInputSchema";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { SortOrderSchema } from "./SortOrderSchema";

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export default UserOrderByWithRelationInputSchema;
