import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostCreateManyAuthorInputSchema } from "./PostCreateManyAuthorInputSchema";

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PostCreateManyAuthorInputSchema),
        z.lazy(() => PostCreateManyAuthorInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export default PostCreateManyAuthorInputEnvelopeSchema;
