import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      displayUsername: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default UserCountOrderByAggregateInputSchema;
