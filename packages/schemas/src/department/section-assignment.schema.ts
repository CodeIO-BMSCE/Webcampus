import { z } from "zod";

export const BaseSectionAssignmentSchema = z.object({
  studentId: z.uuid("Invalid student ID"),
  sectionId: z.uuid("Invalid section ID"),
  semester: z.number().int().positive("Semester must be a positive integer"),
  academicYear: z.string().min(1, "Academic year is required"),
});

export const CreateSectionAssignmentSchema = BaseSectionAssignmentSchema;

export const UpdateSectionAssignmentSchema =
  BaseSectionAssignmentSchema.partial();

export const SectionAssignmentResponseSchema =
  BaseSectionAssignmentSchema.extend({
    id: z.uuid("Invalid section assignment ID"),
  });

export type BaseSectionAssignmentType = z.infer<
  typeof BaseSectionAssignmentSchema
>;
export type CreateSectionAssignmentType = z.infer<
  typeof CreateSectionAssignmentSchema
>;
export type UpdateSectionAssignmentType = z.infer<
  typeof UpdateSectionAssignmentSchema
>;
export type SectionAssignmentResponseType = z.infer<
  typeof SectionAssignmentResponseSchema
>;
