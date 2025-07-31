"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserResponseType } from "@webcampus/schemas/admin";
import { DepartmentFacultyActions } from "./department-faculty-actions";

export const departmentFacultyColumns: ColumnDef<UserResponseType>[] = [
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
    meta: {
      enableCopy: false,
    },
  },
  {
    id: "actions",
    meta: {
      enableCopy: false,
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return <DepartmentFacultyActions userId={id} />;
    },
  },
];
