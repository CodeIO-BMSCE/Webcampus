import { z } from "zod";

/**
 * Common schema for ID parameter validation
 */
export const UUIDParamSchema = z.object({
  id: z.uuid("Invalid ID format").min(1, "ID is required"),
});

/**
 * Common schema for string parameter validation
 */
export const StringParamSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type StringParam = z.infer<typeof StringParamSchema>;
export type UUIDParam = z.infer<typeof UUIDParamSchema>;
