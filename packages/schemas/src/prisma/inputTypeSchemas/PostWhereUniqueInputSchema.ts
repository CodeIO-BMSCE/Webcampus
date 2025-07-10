import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { BoolFilterSchema } from "./BoolFilterSchema";
import { PostWhereInputSchema } from "./PostWhereInputSchema";
import { StringFilterSchema } from "./StringFilterSchema";
import { StringNullableFilterSchema } from "./StringNullableFilterSchema";
import { UserScalarRelationFilterSchema } from "./UserScalarRelationFilterSchema";
import { UserWhereInputSchema } from "./UserWhereInputSchema";

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PostWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          content: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          published: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          authorId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          author: z
            .union([
              z.lazy(() => UserScalarRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    );

export default PostWhereUniqueInputSchema;
