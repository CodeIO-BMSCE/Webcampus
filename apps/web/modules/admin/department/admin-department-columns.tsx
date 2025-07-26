"use client";

import { ColumnDef } from "@tanstack/react-table";
import { frontendEnv } from "@webcampus/common/env";
import { Button } from "@webcampus/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@webcampus/ui/components/dropdown-menu";
import axios from "axios";
import { UserWithRole } from "better-auth/plugins";
import { MoreHorizontal } from "lucide-react";

export const adminDepartmentColumns: ColumnDef<UserWithRole>[] = [
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
      const department = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                const response = await axios.delete(
                  `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/user`,
                  {
                    data: {
                      userId: department.id,
                    },
                    withCredentials: true,
                  }
                );
                console.log(response);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
