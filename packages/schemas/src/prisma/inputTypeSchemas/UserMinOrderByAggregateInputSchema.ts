import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default UserMinOrderByAggregateInputSchema;
