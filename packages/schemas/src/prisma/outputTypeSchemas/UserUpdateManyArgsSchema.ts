import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/UserUncheckedUpdateManyInputSchema";
import { UserUpdateManyMutationInputSchema } from "../inputTypeSchemas/UserUpdateManyMutationInputSchema";
import { UserWhereInputSchema } from "../inputTypeSchemas/UserWhereInputSchema";

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict();

export default UserUpdateManyArgsSchema;
