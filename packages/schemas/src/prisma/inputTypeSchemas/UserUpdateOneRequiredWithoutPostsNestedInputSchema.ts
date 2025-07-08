import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserCreateOrConnectWithoutPostsInputSchema } from "./UserCreateOrConnectWithoutPostsInputSchema";
import { UserCreateWithoutPostsInputSchema } from "./UserCreateWithoutPostsInputSchema";
import { UserUncheckedCreateWithoutPostsInputSchema } from "./UserUncheckedCreateWithoutPostsInputSchema";
import { UserUncheckedUpdateWithoutPostsInputSchema } from "./UserUncheckedUpdateWithoutPostsInputSchema";
import { UserUpdateToOneWithWhereWithoutPostsInputSchema } from "./UserUpdateToOneWithWhereWithoutPostsInputSchema";
import { UserUpdateWithoutPostsInputSchema } from "./UserUpdateWithoutPostsInputSchema";
import { UserUpsertWithoutPostsInputSchema } from "./UserUpsertWithoutPostsInputSchema";
import { UserWhereUniqueInputSchema } from "./UserWhereUniqueInputSchema";

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPostsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPostsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),
          z.lazy(() => UserUpdateWithoutPostsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
        ])
        .optional(),
    })
    .strict();

export default UserUpdateOneRequiredWithoutPostsNestedInputSchema;
