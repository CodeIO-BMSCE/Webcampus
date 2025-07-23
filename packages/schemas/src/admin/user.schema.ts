import { roles } from "@webcampus/types/rbac";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Invalid email address"),
  username: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(roles),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
