/**
 * List of user roles used in the application.
 *
 * IMPORTANT USAGE NOTE:
 * - These roles must be used **only** as pathname segments under the `(protected)` group in the Next.js `app` directory.
 * - Do **not** combine multiple role names into a single route segment (e.g., `/student-faculty` or /student/department is invalid).
 * - Each role should map to its own distinct route (e.g., `/student/dashboard`, `/admin/settings`).
 * - This enforces clean role-based routing and access control.
 */
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
