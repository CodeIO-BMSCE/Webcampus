import { z } from "zod";

export const SemesterTypeSchema = z.enum(["even", "odd"]);

export const SemesterSchema = z.object({
  id: z.uuid(),
  type: SemesterTypeSchema,
  year: z.string().min(4).max(4),
  name: z.string().nullable().optional(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  isCurrent: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string(),
    username: z.string().optional(),
  }),
});

export const CreateSemesterSchema = SemesterSchema.omit({
  id: true,
  isCurrent: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
}).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return start < end;
  },
  {
    message: "Start date must be before end date",
    path: ["endDate"],
  }
);

export const UpdateSemesterSchema = SemesterSchema.partial().extend({
  isCurrent: z.boolean().optional(),
});

export type CreateSemesterInput = z.infer<typeof CreateSemesterSchema>;
export type UpdateSemesterInput = z.infer<typeof UpdateSemesterSchema>;
export type Semester = z.infer<typeof SemesterSchema>;
