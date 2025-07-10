import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { UserCreateNestedOneWithoutSessionsInputSchema } from "./UserCreateNestedOneWithoutSessionsInputSchema";

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    expires: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict();

export default SessionCreateInputSchema;
