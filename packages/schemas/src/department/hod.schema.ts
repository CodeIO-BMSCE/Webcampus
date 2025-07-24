import { z } from "zod";

/**
 * Base HOD schema
 * @description This schema is used to validate the base HOD data
 */
export const BaseHODSchema = z.object({
  userId: z.string("User ID is required"),
  departmentName: z.string("Department name is required"),
});

/**
 * Create HOD schema
 * @description This schema is used to validate the create HOD data
 */
export const CreateHODSchema = BaseHODSchema;

/**
 * Update HOD schema
 * @description This schema is used to validate the update HOD data
 */
export const UpdateHODSchema = BaseHODSchema.partial();

/**
 * HOD response schema
 * @description This schema is used to validate the HOD response data
 */
export const HODResponseSchema = BaseHODSchema.extend({
  id: z.string("HOD ID is required"),
});

export type BaseHODDTO = z.infer<typeof BaseHODSchema>;
export type CreateHODDTO = z.infer<typeof CreateHODSchema>;
export type UpdateHODDTO = z.infer<typeof UpdateHODSchema>;
export type HODResponseDTO = z.infer<typeof HODResponseSchema>;
