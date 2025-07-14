import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";
import { SessionScalarWhereInputSchema } from "./SessionScalarWhereInputSchema";
import { SessionUncheckedUpdateManyWithoutUserInputSchema } from "./SessionUncheckedUpdateManyWithoutUserInputSchema";
import { SessionUpdateManyMutationInputSchema } from "./SessionUpdateManyMutationInputSchema";

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export default SessionUpdateManyWithWhereWithoutUserInputSchema;
