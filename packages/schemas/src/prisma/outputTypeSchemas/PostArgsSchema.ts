import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostIncludeSchema } from "../inputTypeSchemas/PostIncludeSchema";
import { PostSelectSchema } from "../inputTypeSchemas/PostSelectSchema";

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z
  .object({
    select: z.lazy(() => PostSelectSchema).optional(),
    include: z.lazy(() => PostIncludeSchema).optional(),
  })
  .strict();

export default PostArgsSchema;
