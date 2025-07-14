import { z } from "zod";
import type { Prisma } from "../../../generated/prisma";

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      sessions: z.boolean().optional(),
      accounts: z.boolean().optional(),
    })
    .strict();

export default UserCountOutputTypeSelectSchema;
