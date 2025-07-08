import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserOrderByWithAggregationInputSchema } from "../inputTypeSchemas/UserOrderByWithAggregationInputSchema";
import { UserScalarFieldEnumSchema } from "../inputTypeSchemas/UserScalarFieldEnumSchema";
import { UserScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/UserScalarWhereWithAggregatesInputSchema";
import { UserWhereInputSchema } from "../inputTypeSchemas/UserWhereInputSchema";

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export default UserGroupByArgsSchema;
