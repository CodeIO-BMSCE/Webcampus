import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserCreateWithoutPostsInputSchema } from "./UserCreateWithoutPostsInputSchema";
import { UserUncheckedCreateWithoutPostsInputSchema } from "./UserUncheckedCreateWithoutPostsInputSchema";
import { UserUncheckedUpdateWithoutPostsInputSchema } from "./UserUncheckedUpdateWithoutPostsInputSchema";
import { UserUpdateWithoutPostsInputSchema } from "./UserUpdateWithoutPostsInputSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export default UserUpsertWithoutPostsInputSchema;
