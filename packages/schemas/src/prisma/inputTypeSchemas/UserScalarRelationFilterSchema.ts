import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z
    .object({
      is: z.lazy(() => UserWhereInputSchema).optional(),
      isNot: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export default UserScalarRelationFilterSchema;
