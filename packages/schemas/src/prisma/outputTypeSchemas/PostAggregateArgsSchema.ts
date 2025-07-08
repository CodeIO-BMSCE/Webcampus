import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostOrderByWithRelationInputSchema } from "../inputTypeSchemas/PostOrderByWithRelationInputSchema";
import { PostWhereInputSchema } from "../inputTypeSchemas/PostWhereInputSchema";
import { PostWhereUniqueInputSchema } from "../inputTypeSchemas/PostWhereUniqueInputSchema";

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export default PostAggregateArgsSchema;
