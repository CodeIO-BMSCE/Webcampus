import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema";

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export default PostIncludeSchema;
