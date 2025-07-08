import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string(),
      content: z.string().optional().nullable(),
      published: z.boolean().optional(),
    })
    .strict();

export default PostCreateManyAuthorInputSchema;
