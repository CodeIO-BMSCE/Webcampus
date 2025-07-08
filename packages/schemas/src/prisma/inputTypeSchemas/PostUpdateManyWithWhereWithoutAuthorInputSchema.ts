import { z } from "zod";
import type { Prisma } from "../../../../db/generated/prisma";
import { PostScalarWhereInputSchema } from "./PostScalarWhereInputSchema";
import { PostUncheckedUpdateManyWithoutAuthorInputSchema } from "./PostUncheckedUpdateManyWithoutAuthorInputSchema";
import { PostUpdateManyMutationInputSchema } from "./PostUpdateManyMutationInputSchema";

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => PostScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateManyMutationInputSchema),
        z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema),
      ]),
    })
    .strict();

export default PostUpdateManyWithWhereWithoutAuthorInputSchema;
