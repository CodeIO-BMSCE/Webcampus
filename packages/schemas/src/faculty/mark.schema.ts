import { z } from "zod";

export const EligibilityStatus = z.enum(["ELIGIBLE", "NOT_ELIGIBLE"]);

export const BaseMarkSchema = z.object({
  studentId: z.string("Invalid student ID"),
  courseId: z.string("Invalid course ID"),
  cie1: z.number().nullable(),
  cie2: z.number().nullable(),
  cie3: z.number().nullable(),
  aat1: z.number().nullable(),
  aat2: z.number().nullable(),
  lab1: z.number().nullable(),
  lab2: z.number().nullable(),
  labTotal: z.number().nullable(),
  cieTotal: z.number().nullable(),
  status: EligibilityStatus,
});

export const MarkResponseSchema = BaseMarkSchema.extend({
  id: z.string("Invalid mark ID"),
});

export const CreateMarkSchema = BaseMarkSchema;

export const UpdateMarkSchema = BaseMarkSchema.partial();

export type BaseMarkType = z.infer<typeof BaseMarkSchema>;
export type CreateMarkType = z.infer<typeof CreateMarkSchema>;
export type UpdateMarkType = z.infer<typeof UpdateMarkSchema>;
export type MarkResponseType = z.infer<typeof MarkResponseSchema>;
