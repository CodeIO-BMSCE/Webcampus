"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SectionResponseType } from "@webcampus/schemas/department";

export const DepartmentSectionColumns: ColumnDef<SectionResponseType>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Department",
    accessorKey: "departmentName",
  },
  {
    header: "Semester",
    accessorKey: "semester",
  },
];
