import { z } from "zod";

export const CondonationStatus = z.enum([
  "NOT_REQUESTED",
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const BaseAttendanceSchema = z.object({
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

export const CreateAttendanceSchema = BaseAttendanceSchema;
export const UpdateAttendanceSchema = BaseAttendanceSchema.partial();

export const AttendanceResponseSchema = BaseAttendanceSchema.extend({
  id: z.string("Invalid attendance ID"),
});

export type BaseAttendanceType = z.infer<typeof BaseAttendanceSchema>;
export type CreateAttendanceType = z.infer<typeof CreateAttendanceSchema>;
export type UpdateAttendanceType = z.infer<typeof UpdateAttendanceSchema>;
export type AttendanceResponseType = z.infer<typeof AttendanceResponseSchema>;
