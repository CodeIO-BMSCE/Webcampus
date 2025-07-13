import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderSchema } from "./SortOrderSchema";

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export default SessionOrderByRelationAggregateInputSchema;
