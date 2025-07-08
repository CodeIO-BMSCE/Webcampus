import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserCreateNestedOneWithoutPostsInputSchema } from "./UserCreateNestedOneWithoutPostsInputSchema";

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    title: z.string(),
    content: z.string().optional().nullable(),
    published: z.boolean().optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
  })
  .strict();

export default PostCreateInputSchema;
