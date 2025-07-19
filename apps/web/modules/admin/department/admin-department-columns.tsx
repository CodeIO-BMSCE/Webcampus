"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Session } from "@webcampus/auth/types";

export const adminDepartmentColumns: ColumnDef<Session["user"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
