"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserWithRole } from "better-auth/plugins";

export const adminDepartmentColumns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
