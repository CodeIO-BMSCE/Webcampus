import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostIncludeSchema } from "../inputTypeSchemas/PostIncludeSchema";
import { PostOrderByWithRelationInputSchema } from "../inputTypeSchemas/PostOrderByWithRelationInputSchema";
import { PostScalarFieldEnumSchema } from "../inputTypeSchemas/PostScalarFieldEnumSchema";
import { PostWhereInputSchema } from "../inputTypeSchemas/PostWhereInputSchema";
import { PostWhereUniqueInputSchema } from "../inputTypeSchemas/PostWhereUniqueInputSchema";
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    content: z.boolean().optional(),
    published: z.boolean().optional(),
    authorId: z.boolean().optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: z.lazy(() => PostIncludeSchema).optional(),
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
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export default PostFindManyArgsSchema;
