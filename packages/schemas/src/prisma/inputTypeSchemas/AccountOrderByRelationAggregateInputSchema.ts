import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default AccountOrderByRelationAggregateInputSchema;
