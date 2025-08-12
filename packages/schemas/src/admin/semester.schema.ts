import { z } from "zod";

export const SemesterTypeSchema = z.enum(["even", "odd"]);

export const BaseSemesterSchema = z.object({
  type: SemesterTypeSchema,
  year: z.string().min(4, { error: "Year is required" }),
  /**
   * Just a temporary fix to get the date from the form.
   * https://github.com/colinhacks/zod/issues/4236#issuecomment-3101645579
   */
  startDate: z.coerce.date() as z.ZodDate,
  /**
   * Just a temporary fix to get the date from the form.
   * https://github.com/colinhacks/zod/issues/4236#issuecomment-3101645579
   */
  endDate: z.coerce.date() as z.ZodDate,
  userId: z.string(),
});

export const CreateSemesterSchema = BaseSemesterSchema;

export const SemesterResponseSchema = BaseSemesterSchema.extend({
  id: z.uuid(),
  name: z.string().nullish(),
  isCurrent: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export const SemesterQuerySchema = SemesterResponseSchema.partial();

export type CreateSemesterType = z.infer<typeof CreateSemesterSchema>;
export type SemesterResponseType = z.infer<typeof SemesterResponseSchema>;
export type SemesterQueryType = z.infer<typeof SemesterQuerySchema>;
