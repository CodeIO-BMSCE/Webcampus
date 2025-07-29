import { z } from "zod";

export const BaseFacultySchema = z.object({
  userId: z.uuid("Invalid user ID"),
  departmentName: z.string("Invalid department name"),
});

export const CreateFacultySchema = BaseFacultySchema;

export const UpdateFacultySchema = BaseFacultySchema.partial();

export const FacultyResponseSchema = BaseFacultySchema.extend({
  id: z.uuid("Invalid faculty ID"),
});

export type BaseFacultyType = z.infer<typeof BaseFacultySchema>;
export type CreateFacultyType = z.infer<typeof CreateFacultySchema>;
export type UpdateFacultyType = z.infer<typeof UpdateFacultySchema>;
export type FacultyResponseType = z.infer<typeof FacultyResponseSchema>;
