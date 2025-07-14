import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z
    .object({
      is: z.lazy(() => UserWhereInputSchema).optional(),
      isNot: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export default UserScalarRelationFilterSchema;
