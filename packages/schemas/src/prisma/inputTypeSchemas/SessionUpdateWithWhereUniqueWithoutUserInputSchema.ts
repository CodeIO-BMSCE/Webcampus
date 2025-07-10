import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { SessionUncheckedUpdateWithoutUserInputSchema } from "./SessionUncheckedUpdateWithoutUserInputSchema";
import { SessionUpdateWithoutUserInputSchema } from "./SessionUpdateWithoutUserInputSchema";
import { SessionWhereUniqueInputSchema } from "./SessionWhereUniqueInputSchema";

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export default SessionUpdateWithWhereUniqueWithoutUserInputSchema;
