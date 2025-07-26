import { z } from "zod";

export const createSectionAssignmentSchema = z.object({
  studentId: z.string().uuid("Invalid student ID"),
  sectionId: z.string().uuid("Invalid section ID"),
  semester: z.number().int().positive("Semester must be a positive integer"),
  academicYear: z.string().min(1, "Academic year is required"),
});

export const updateSectionAssignmentSchema = z.object({
  sectionId: z.string().uuid("Invalid section ID").optional(),
  semester: z.number().int().positive().optional(),
  academicYear: z.string().min(1).optional(),
});

export type CreateSectionAssignmentType = z.infer<
  typeof createSectionAssignmentSchema
>;
export type UpdateSectionAssignmentType = z.infer<
  typeof updateSectionAssignmentSchema
>;
