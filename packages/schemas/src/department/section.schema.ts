import { z } from "zod";

export const createSectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  branchId: z.uuid("Invalid branch ID"),
  semester: z.number().int().positive("Semester must be a positive integer"),
});

export const updateSectionSchema = z.object({
  name: z.string().min(1, "Section name is required").optional(),
  branchId: z.uuid("Invalid branch ID").optional(),
  semester: z
    .number()
    .int()
    .positive("Semester must be a positive integer")
    .optional(),
});

export type CreateSectionType = z.infer<typeof createSectionSchema>;
export type UpdateSectionType = z.infer<typeof updateSectionSchema>;
