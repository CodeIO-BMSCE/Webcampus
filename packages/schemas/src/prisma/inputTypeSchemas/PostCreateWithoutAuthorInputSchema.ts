import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> =
  z
    .object({
      title: z.string(),
      content: z.string().optional().nullable(),
      published: z.boolean().optional(),
    })
    .strict();

export default PostCreateWithoutAuthorInputSchema;
