import { z } from "zod";
import { BasePaginationSchema } from "../common.schemas";

/**
 * Base course schema with all required fields
 */
const BaseCourseSchema = z.object({
  code: z
    .string()
    .min(1, "Course code is required")
    .max(20, "Course code must be less than 20 characters"),

  name: z
    .string()
    .min(1, "Course name is required")
    .max(200, "Course name must be less than 200 characters")
    .trim(),

  type: z.string(),

  credits: z
    .number()
    .int("Credits must be an integer")
    .min(1, "Credits must be at least 1")
    .max(10, "Credits cannot exceed 10"),

  hasLab: z.boolean().optional().default(false),
});

/**
 * Schema for creating a new course
 */
export const CreateCourseSchema = BaseCourseSchema;

/**
 * Schema for updating an existing course
 * All fields are optional for partial updates
 */
export const UpdateCourseSchema = BaseCourseSchema.partial();

/**
 * Schema for query parameters in course listing
 */
export const CourseQuerySchema = BasePaginationSchema.extend({
  type: BaseCourseSchema.shape.type.optional(),
  hasLab: BaseCourseSchema.shape.hasLab.optional(),
});

/**
 * Response schema for a single course
 */
export const CourseResponseSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
  credits: z.number(),
  hasLab: z.boolean(),
  _count: z
    .object({
      assignments: z.number(),
      registrations: z.number(),
      marks: z.number(),
      attendances: z.number(),
    })
    .optional(),
});

/**
 * Response schema for course listing with pagination
 */
export const CourseListResponseSchema = z.object({
  data: z.array(CourseResponseSchema),
  meta: z.object({
    total: z.number(),
    skip: z.number(),
    take: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
});

export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseDTO = z.infer<typeof UpdateCourseSchema>;
export type CourseQueryDTO = z.infer<typeof CourseQuerySchema>;
export type CourseResponseDTO = z.infer<typeof CourseResponseSchema>;
export type CourseListResponseDTO = z.infer<typeof CourseListResponseSchema>;
