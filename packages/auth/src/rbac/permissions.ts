import { type Role } from "@webcampus/types/rbac";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  attendance: ["create"],
  semester: ["create"],
  courses: ["create", "read"],
  department: ["create", "read"],
  hod: ["create", "read", "remove"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  admin: ac.newRole({
    semester: ["create"],
    department: ["create", "read"],
    ...adminAc.statements,
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
  }),
  coe: ac.newRole({
    attendance: ["create"],
  }),
  department: ac.newRole({
    ...adminAc.statements,
    courses: ["create", "read"],
    hod: ["create", "read", "remove"],
    /**
     * Admin statements are used to create students and faculty
     */
  }),
} satisfies Record<Role, unknown>;

export type Permissions = {
  [K in keyof typeof statement]: (typeof statement)[K][number][];
};
