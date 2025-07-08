import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostWhereInputSchema } from "../inputTypeSchemas/PostWhereInputSchema";

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export default PostDeleteManyArgsSchema;
