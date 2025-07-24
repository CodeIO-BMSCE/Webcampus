"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserResponseDTO } from "@webcampus/schemas/admin";
import { DepartmentFacultyActions } from "./department-faculty-actions";

export const departmentFacultyColumns: ColumnDef<UserResponseDTO>[] = [
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
