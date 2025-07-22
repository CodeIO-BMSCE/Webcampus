import { z } from "zod";

/**
 * Common schema for ID parameter validation
 */
export const ParamSchema = z.object({
  id: z.uuid("Invalid ID format").min(1, "ID is required"),
});

/**
 * Base pagination schema
 */
export const BasePaginationSchema = z.object({
  skip: z.number().transform(Number).optional().default(0),

  take: z.number().transform(Number).optional().default(10),

  search: z.string().trim().optional(),

  sort: z.enum(["asc", "desc"]).optional().default("asc"),
});

/**
 * Base response metadata schema
 */
export const BaseMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export type UUIDParam = z.infer<typeof ParamSchema>;
