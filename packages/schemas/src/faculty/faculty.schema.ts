import { z } from "zod";

export const createFacultySchema = z.object({
  userId: z.uuid("Invalid user ID"),
  departmentName: z.string("Invalid department name"),
});

export const updateFacultySchema = z.object({
  departmentName: z.string("Invalid department name").optional(),
});

export type CreateFacultyType = z.infer<typeof createFacultySchema>;
export type UpdateFacultyType = z.infer<typeof updateFacultySchema>;
