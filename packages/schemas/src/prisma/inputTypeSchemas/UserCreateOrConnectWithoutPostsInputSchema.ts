import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { UserCreateWithoutPostsInputSchema } from "./UserCreateWithoutPostsInputSchema";
import { UserUncheckedCreateWithoutPostsInputSchema } from "./UserUncheckedCreateWithoutPostsInputSchema";
import { UserWhereUniqueInputSchema } from "./UserWhereUniqueInputSchema";

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ]),
    })
    .strict();

export default UserCreateOrConnectWithoutPostsInputSchema;
