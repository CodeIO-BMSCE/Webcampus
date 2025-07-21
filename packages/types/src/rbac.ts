export const roles = [
  "student",
  "faculty",
  "coordinator",
  "hod",
  "coe",
  "department",
  "admin",
] as const;

/** Type representing all allowed user roles in the system. */
export type Role = (typeof roles)[number];
