import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      content: z.string().optional().nullable(),
      published: z.boolean().optional(),
      authorId: z.string(),
    })
    .strict();

export default PostCreateManyInputSchema;
