import { z } from "zod";

export const SemesterTypeSchema = z.enum(["even", "odd"]);

export const BaseSemesterSchema = z.object({
  type: SemesterTypeSchema,
  year: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  userId: z.string(),
});

export const CreateSemesterSchema = BaseSemesterSchema;

export const SemesterResponseSchema = BaseSemesterSchema.extend({
  id: z.uuid(),
  name: z.string().nullable(),
  isCurrent: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type CreateSemesterInput = z.infer<typeof CreateSemesterSchema>;
export type SemesterResponseType = z.infer<typeof SemesterResponseSchema>;
