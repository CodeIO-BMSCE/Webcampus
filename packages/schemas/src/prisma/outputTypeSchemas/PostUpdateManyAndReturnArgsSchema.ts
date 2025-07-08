import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/PostUncheckedUpdateManyInputSchema";
import { PostUpdateManyMutationInputSchema } from "../inputTypeSchemas/PostUpdateManyMutationInputSchema";
import { PostWhereInputSchema } from "../inputTypeSchemas/PostWhereInputSchema";

export const PostUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostUpdateManyMutationInputSchema,
        PostUncheckedUpdateManyInputSchema,
      ]),
      where: PostWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict();

export default PostUpdateManyAndReturnArgsSchema;
