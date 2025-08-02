import { z } from "zod";

export const GetFrozenDataSchema = z.object({
  academicYear: z.string().optional(),
  semester: z.number().optional()
});

export const GetFinalLockedDataSchema = z.object({
  academicYear: z.string().optional(),
  semester: z.number().optional()
});
