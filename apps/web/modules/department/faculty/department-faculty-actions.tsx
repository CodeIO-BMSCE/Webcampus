"use client";

import { Button } from "@webcampus/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@webcampus/ui/components/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDepartmentFacultyActions } from "./use-department-faculty-actions";

export const DepartmentFacultyActions = ({ userId }: { userId: string }) => {
  const { deleteFaculty, createHOD, hod } = useDepartmentFacultyActions();
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
            deleteFaculty(userId);
          }}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            createHOD(userId);
          }}
          disabled={!!hod?.id}
        >
          Make HOD
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
