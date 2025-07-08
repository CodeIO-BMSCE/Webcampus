import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserWhereInputSchema } from "../inputTypeSchemas/UserWhereInputSchema";

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export default UserDeleteManyArgsSchema;
