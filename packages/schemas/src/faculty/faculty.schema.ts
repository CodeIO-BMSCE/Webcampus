import { z } from "zod";

export const createFacultySchema = z.object({
  userId: z.uuid("Invalid user ID"),
  branchId: z.uuid("Invalid branch ID"),
});

export const updateFacultySchema = z.object({
  branchId: z.uuid("Invalid branch ID").optional(),
});

export type CreateFacultyType = z.infer<typeof createFacultySchema>;
export type UpdateFacultyType = z.infer<typeof updateFacultySchema>;
