import { z } from "zod";

export const BaseSectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  departmentName: z.string("Invalid department name"),
  semester: z
    .number()
    .positive({ message: "Semester must be a positive number" })
    .min(1, "Semester must be at least 1")
    .max(8, "Semester must be at most 8"),
});

export const CreateSectionSchema = BaseSectionSchema;

export const SectionResponseSchema = BaseSectionSchema.extend({
  id: z.uuid("Invalid section ID"),
});

export const SectionQuerySchema = SectionResponseSchema.partial();

export type BaseSectionType = z.infer<typeof BaseSectionSchema>;
export type CreateSectionType = z.infer<typeof CreateSectionSchema>;
export type SectionResponseType = z.infer<typeof SectionResponseSchema>;
export type SectionQueryType = z.infer<typeof SectionQuerySchema>;
