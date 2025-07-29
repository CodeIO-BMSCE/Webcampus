import { z } from "zod";

export const createCourseRegistrationSchema = z.object({
  studentId: z.uuid("Invalid student ID"),
  courseId: z.uuid("Invalid course ID"),
  semester: z.number().int().positive("Semester must be a positive integer"),
  academicYear: z.string().min(1, "Academic year is required"),
  hasDropped: z.boolean().default(false).optional(),
});

export const updateCourseRegistrationSchema = z.object({
  hasDropped: z.boolean(),
});

export const CourseRegistrationResponseSchema =
  createCourseRegistrationSchema.extend({
    id: z.uuid("Invalid course registration ID"),
  });

export type CreateCourseRegistrationType = z.infer<
  typeof createCourseRegistrationSchema
>;
export type UpdateCourseRegistrationType = z.infer<
  typeof updateCourseRegistrationSchema
>;
export type CourseRegistrationResponseType = z.infer<
  typeof CourseRegistrationResponseSchema
>;
