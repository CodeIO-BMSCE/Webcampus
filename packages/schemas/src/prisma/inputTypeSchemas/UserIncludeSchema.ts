import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostFindManyArgsSchema } from "../outputTypeSchemas/PostFindManyArgsSchema";
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema";

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    posts: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export default UserIncludeSchema;
