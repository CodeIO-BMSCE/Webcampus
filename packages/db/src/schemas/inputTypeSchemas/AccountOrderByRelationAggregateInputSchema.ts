import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default AccountOrderByRelationAggregateInputSchema;
