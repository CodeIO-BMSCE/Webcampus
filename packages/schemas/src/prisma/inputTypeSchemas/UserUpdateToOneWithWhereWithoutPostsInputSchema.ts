import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { UserUncheckedUpdateWithoutPostsInputSchema } from "./UserUncheckedUpdateWithoutPostsInputSchema";
import { UserUpdateWithoutPostsInputSchema } from "./UserUpdateWithoutPostsInputSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
      ]),
    })
    .strict();

export default UserUpdateToOneWithWhereWithoutPostsInputSchema;
