import { type Role } from "@webcampus/types/rbac";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  attendance: ["create"],
  semester: ["create", "delete", "read"],
  courses: ["create", "read"],
  department: ["create", "read"],
  hod: ["create", "read", "remove"],
  sectionAssignment: ["create", "read", "update", "delete"],
  courseAssignment: ["create"],
  section: ["create", "read"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  admin: ac.newRole({
    ...adminAc.statements,
    semester: ["create", "read", "delete"],
    department: ["create", "read"],
    sectionAssignment: ["create", "read", "update", "delete"],
  }),
  student: ac.newRole({
    user: [],
  }),
  faculty: ac.newRole({
    attendance: ["create"],
  }),
  coordinator: ac.newRole({
    attendance: ["create"],
  }),
  hod: ac.newRole({
    ...adminAc.statements,
    courseAssignment: ["create"],
  }),
  coe: ac.newRole({
    attendance: ["create"],
  }),
  department: ac.newRole({
    ...adminAc.statements,
    courses: ["create", "read"],
    hod: ["create", "read", "remove"],
    sectionAssignment: ["create", "read", "update", "delete"],
    section: ["create", "read"],
  }),
} satisfies Record<Role, unknown>;

export type Permissions = {
  [K in keyof typeof statement]: (typeof statement)[K][number][];
};
