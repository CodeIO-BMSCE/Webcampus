import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostCreateManyAuthorInputEnvelopeSchema } from "./PostCreateManyAuthorInputEnvelopeSchema";
import { PostCreateOrConnectWithoutAuthorInputSchema } from "./PostCreateOrConnectWithoutAuthorInputSchema";
import { PostCreateWithoutAuthorInputSchema } from "./PostCreateWithoutAuthorInputSchema";
import { PostScalarWhereInputSchema } from "./PostScalarWhereInputSchema";
import { PostUncheckedCreateWithoutAuthorInputSchema } from "./PostUncheckedCreateWithoutAuthorInputSchema";
import { PostUpdateManyWithWhereWithoutAuthorInputSchema } from "./PostUpdateManyWithWhereWithoutAuthorInputSchema";
import { PostUpdateWithWhereUniqueWithoutAuthorInputSchema } from "./PostUpdateWithWhereUniqueWithoutAuthorInputSchema";
import { PostUpsertWithWhereUniqueWithoutAuthorInputSchema } from "./PostUpsertWithWhereUniqueWithoutAuthorInputSchema";
import { PostWhereUniqueInputSchema } from "./PostWhereUniqueInputSchema";

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutAuthorInputSchema),
          z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyAuthorInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export default PostUncheckedUpdateManyWithoutAuthorNestedInputSchema;
