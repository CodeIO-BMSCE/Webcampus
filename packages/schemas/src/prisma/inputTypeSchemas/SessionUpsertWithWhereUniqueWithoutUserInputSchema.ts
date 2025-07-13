import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { SessionCreateWithoutUserInputSchema } from "./SessionCreateWithoutUserInputSchema";
import { SessionUncheckedCreateWithoutUserInputSchema } from "./SessionUncheckedCreateWithoutUserInputSchema";
import { SessionUncheckedUpdateWithoutUserInputSchema } from "./SessionUncheckedUpdateWithoutUserInputSchema";
import { SessionUpdateWithoutUserInputSchema } from "./SessionUpdateWithoutUserInputSchema";
import { SessionWhereUniqueInputSchema } from "./SessionWhereUniqueInputSchema";

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export default SessionUpsertWithWhereUniqueWithoutUserInputSchema;
