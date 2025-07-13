import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      expiresAt: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      ipAddress: z.lazy(() => SortOrderSchema).optional(),
      userAgent: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default SessionMinOrderByAggregateInputSchema;
