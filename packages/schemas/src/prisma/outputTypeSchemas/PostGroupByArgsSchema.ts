import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostOrderByWithAggregationInputSchema } from "../inputTypeSchemas/PostOrderByWithAggregationInputSchema";
import { PostScalarFieldEnumSchema } from "../inputTypeSchemas/PostScalarFieldEnumSchema";
import { PostScalarWhereWithAggregatesInputSchema } from "../inputTypeSchemas/PostScalarWhereWithAggregatesInputSchema";
import { PostWhereInputSchema } from "../inputTypeSchemas/PostWhereInputSchema";

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export default PostGroupByArgsSchema;
