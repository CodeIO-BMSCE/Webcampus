"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserWithRole } from "better-auth/plugins";
import { DepartmentFacultyActions } from "./department-faculty-actions";

export const departmentFacultyColumns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return <DepartmentFacultyActions userId={id} />;
    },
  },
];
