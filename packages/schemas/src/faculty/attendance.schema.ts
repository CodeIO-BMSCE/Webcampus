import { z } from "zod";

export const CondonationStatus = z.enum([
  "NOT_REQUESTED",
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const createAttendanceSchema = z.object({
  studentId: z.string("Invalid student ID"),
  courseId: z.string("Invalid course ID"),
  total: z
    .number()
    .int()
    .min(0, "Total classes must be a non-negative integer"),
  present: z
    .number()
    .int()
    .min(0, "Present classes must be a non-negative integer"),
  absent: z
    .number()
    .int()
    .min(0, "Absent classes must be a non-negative integer"),
  condonationStatus: CondonationStatus.default("NOT_REQUESTED"),
  percentage: z
    .number()
    .min(0)
    .max(100, "Percentage must be between 0 and 100"),
});

export const updateAttendanceSchema = z.object({
  total: z
    .number()
    .int()
    .min(0, "Total classes must be a non-negative integer")
    .optional(),
  present: z
    .number()
    .int()
    .min(0, "Present classes must be a non-negative integer")
    .optional(),
  absent: z
    .number()
    .int()
    .min(0, "Absent classes must be a non-negative integer")
    .optional(),
  condonationStatus: CondonationStatus.optional(),
  percentage: z
    .number()
    .min(0)
    .max(100, "Percentage must be between 0 and 100")
    .optional(),
});

export type CreateAttendanceType = z.infer<typeof createAttendanceSchema>;
export type UpdateAttendanceType = z.infer<typeof updateAttendanceSchema>;
