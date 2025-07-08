import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      content: z.string().optional().nullable(),
      published: z.boolean().optional(),
      authorId: z.number().int(),
    })
    .strict();

export default PostCreateManyInputSchema;
