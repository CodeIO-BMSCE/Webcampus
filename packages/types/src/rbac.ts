export const roles = [
  "student",
  "faculty",
  "coordinator",
  "hod",
  "coe",
  "department",
  "admin",
] as const;

export type Role = (typeof roles)[number];
