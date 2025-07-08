import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      posts: z.boolean().optional(),
    })
    .strict();

export default UserCountOutputTypeSelectSchema;
