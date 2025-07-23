import { z } from "zod";

export const assignmentTypeEnum = z.enum(["THEORY", "LAB"]);

export const createCourseAssignmentSchema = z.object({
  courseId: z.uuid("Invalid course ID"),
  facultyId: z.uuid("Invalid faculty ID"),
  sectionId: z.uuid("Invalid section ID"),
  batchId: z.uuid("Invalid batch ID").optional(),
  assignmentType: assignmentTypeEnum,
  semester: z.number().int().positive("Semester must be a positive integer"),
  academicYear: z.string().min(1, "Academic year is required"),
});

export const updateCourseAssignmentSchema = z.object({
  facultyId: z.uuid("Invalid faculty ID").optional(),
  batchId: z.uuid("Invalid batch ID").optional().nullable(),
});

export type CreateCourseAssignmentType = z.infer<
  typeof createCourseAssignmentSchema
>;
export type UpdateCourseAssignmentType = z.infer<
  typeof updateCourseAssignmentSchema
>;
