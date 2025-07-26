import { z } from "zod";

export const assignmentTypeEnum = z.enum(["THEORY", "LAB"]);

export const BaseCourseAssignmentSchema = z.object({
  courseId: z.uuid("Invalid course ID"),
  facultyId: z.uuid("Invalid faculty ID"),
  sectionId: z.uuid("Invalid section ID"),
  assignmentType: assignmentTypeEnum,
  semester: z.number().int().positive("Semester must be a positive integer"),
  academicYear: z.string().min(1, "Academic year is required"),
});

export const CreateCourseAssignmentSchema = BaseCourseAssignmentSchema;

export const CourseAssignmentResponseSchema = BaseCourseAssignmentSchema.extend(
  {
    id: z.uuid("Invalid course assignment ID"),
    batchId: z.uuid("Invalid batch ID").nullable(),
  }
);

export type BaseCourseAssignmentType = z.infer<
  typeof BaseCourseAssignmentSchema
>;
export type CreateCourseAssignmentType = z.infer<
  typeof CreateCourseAssignmentSchema
>;
export type CourseAssignmentResponseType = z.infer<
  typeof CourseAssignmentResponseSchema
>;
