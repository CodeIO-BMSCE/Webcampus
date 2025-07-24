import { z } from "zod";

/**
 * Base Department Schema
 * @description This schema is used to validate the base department data
 */
export const BaseDepartmentSchema = z.object({
  name: z.string().min(1, { message: "Department name cannot be empty" }),
});

/**
 * Create Department Schema
 * @description This schema is used to validate the create department data
 */
export const CreateDepartmentSchema = BaseDepartmentSchema;

/**
 * Update Department Schema
 * @description This schema is used to validate the update department data
 */
export const UpdateDepartmentSchema = BaseDepartmentSchema.partial();

/**
 * Department Response Schema
 * @description This schema is used to validate the department response data
 */
export const DepartmentResponseSchema = BaseDepartmentSchema.extend({
  id: z.uuid(),
  userId: z.string().optional().nullable(),
  hodId: z.string().optional().nullable(),
});

export type BaseDepartmentDTO = z.infer<typeof BaseDepartmentSchema>;
export type CreateDepartmentDTO = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartmentDTO = z.infer<typeof UpdateDepartmentSchema>;
export type DepartmentResponseDTO = z.infer<typeof DepartmentResponseSchema>;
