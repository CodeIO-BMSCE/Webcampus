import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostCreateWithoutAuthorInputSchema } from "./PostCreateWithoutAuthorInputSchema";
import { PostUncheckedCreateWithoutAuthorInputSchema } from "./PostUncheckedCreateWithoutAuthorInputSchema";
import { PostUncheckedUpdateWithoutAuthorInputSchema } from "./PostUncheckedUpdateWithoutAuthorInputSchema";
import { PostUpdateWithoutAuthorInputSchema } from "./PostUpdateWithoutAuthorInputSchema";
import { PostWhereUniqueInputSchema } from "./PostWhereUniqueInputSchema";

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export default PostUpsertWithWhereUniqueWithoutAuthorInputSchema;
