"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CourseResponseDTO } from "@webcampus/schemas/department";

export const DepartmentCoursesColumns: ColumnDef<CourseResponseDTO>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "credits",
    header: "Credits",
  },
  {
    accessorKey: "hasLab",
    header: "Lab",
  },
];
