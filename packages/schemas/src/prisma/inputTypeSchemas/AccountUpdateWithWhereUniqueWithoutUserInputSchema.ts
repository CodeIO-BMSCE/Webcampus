import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { AccountUncheckedUpdateWithoutUserInputSchema } from "./AccountUncheckedUpdateWithoutUserInputSchema";
import { AccountUpdateWithoutUserInputSchema } from "./AccountUpdateWithoutUserInputSchema";
import { AccountWhereUniqueInputSchema } from "./AccountWhereUniqueInputSchema";

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export default AccountUpdateWithWhereUniqueWithoutUserInputSchema;
