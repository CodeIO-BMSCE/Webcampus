import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SortOrderInputSchema } from "./SortOrderInputSchema";
import { SortOrderSchema } from "./SortOrderSchema";

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      identifier: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      expiresAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
    })
    .strict();

export default VerificationOrderByWithRelationInputSchema;
