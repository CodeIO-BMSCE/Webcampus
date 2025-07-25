import { z } from "zod";

export const EligibilityStatus = z.enum(["ELIGIBLE", "NOT_ELIGIBLE"]);

export const createMarkSchema = z.object({
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

export const updateMarkSchema = z.object({
  cie1: z.number().nullable(),
  cie2: z.number().nullable(),
  cie3: z.number().nullable(),
  aat1: z.number().nullable(),
  aat2: z.number().nullable(),
  lab1: z.number().nullable(),
  lab2: z.number().nullable(),
  labTotal: z.number().nullable(),
  cieTotal: z.number().nullable(),
  status: EligibilityStatus.nullable(),
});

export type CreateMarkType = z.infer<typeof createMarkSchema>;
export type UpdateMarkType = z.infer<typeof updateMarkSchema>;
