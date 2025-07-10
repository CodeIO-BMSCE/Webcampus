import { z } from "zod";
import type { Prisma } from "../../../../../node_modules/.prisma/client";
import { PostCreateWithoutAuthorInputSchema } from "./PostCreateWithoutAuthorInputSchema";
import { PostUncheckedCreateWithoutAuthorInputSchema } from "./PostUncheckedCreateWithoutAuthorInputSchema";
import { PostWhereUniqueInputSchema } from "./PostWhereUniqueInputSchema";

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutAuthorInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export default PostCreateOrConnectWithoutAuthorInputSchema;
