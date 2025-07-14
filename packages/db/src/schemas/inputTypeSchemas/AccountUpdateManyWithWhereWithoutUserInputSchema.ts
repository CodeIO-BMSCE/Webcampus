import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { AccountScalarWhereInputSchema } from "./AccountScalarWhereInputSchema";
import { AccountUncheckedUpdateManyWithoutUserInputSchema } from "./AccountUncheckedUpdateManyWithoutUserInputSchema";
import { AccountUpdateManyMutationInputSchema } from "./AccountUpdateManyMutationInputSchema";

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export default AccountUpdateManyWithWhereWithoutUserInputSchema;
