import { type Role } from "@webcampus/types/rbac";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  attendance: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  admin: ac.newRole({
    attendance: ["read"],
    ...adminAc.statements,
  }),
  student: ac.newRole({
    attendance: ["read"],
    user: [],
  }),
  faculty: ac.newRole({
    attendance: ["create", "update"],
  }),
  coordinator: ac.newRole({
    attendance: ["create", "update", "delete"],
  }),
  hod: ac.newRole({
    attendance: ["read"],
    ...adminAc.statements,
  }),
  coe: ac.newRole({
    attendance: ["read"],
  }),
  department: ac.newRole({
    attendance: ["read"],
    ...adminAc.statements,
  }),
} satisfies Record<Role, unknown>;

export type Permissions = {
  [K in keyof typeof statement]: (typeof statement)[K][number][];
};
