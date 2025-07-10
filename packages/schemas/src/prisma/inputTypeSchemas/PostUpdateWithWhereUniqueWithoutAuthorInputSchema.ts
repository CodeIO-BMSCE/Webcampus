import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostUncheckedUpdateWithoutAuthorInputSchema } from "./PostUncheckedUpdateWithoutAuthorInputSchema";
import { PostUpdateWithoutAuthorInputSchema } from "./PostUpdateWithoutAuthorInputSchema";
import { PostWhereUniqueInputSchema } from "./PostWhereUniqueInputSchema";

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export default PostUpdateWithWhereUniqueWithoutAuthorInputSchema;
