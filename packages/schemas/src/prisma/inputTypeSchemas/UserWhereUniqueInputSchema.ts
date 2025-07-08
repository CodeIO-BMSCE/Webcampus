import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostListRelationFilterSchema } from "./PostListRelationFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        email: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          email: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          posts: z.lazy(() => PostListRelationFilterSchema).optional(),
        })
        .strict()
    );

export default UserWhereUniqueInputSchema;
