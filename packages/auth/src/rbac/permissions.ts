import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  attendance: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  student: ac.newRole({
    attendance: ["create"],
  }),
  faculty: ac.newRole({
    attendance: ["create", "update"],
  }),
  coordinator: ac.newRole({
    attendance: ["create", "update", "delete"],
  }),
};

export type Role = keyof typeof roles;
export const roleTypes = Object.keys(roles) as Role[];
export type Permissions = Record<
  keyof typeof statement,
  (typeof statement)[keyof typeof statement][number][]
>;
