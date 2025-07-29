"use client";

import { CreateUserDialog } from "@/modules/auth/create-user/create-user-dialog";
import { useQuery } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { UserResponseDTO } from "@webcampus/schemas/admin";
import { BaseResponse } from "@webcampus/types/api";
import { DataTable } from "@webcampus/ui/components/data-table";
import { Skeleton } from "@webcampus/ui/components/skeleton";
import axios from "axios";
import qs from "qs";
import React from "react";
import { departmentFacultyColumns } from "./department-faculty-columns";

export const DepartmentFacultyView = () => {
  const response = useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const queryParams = qs.stringify(
        {
          role: ["hod", "faculty"],
        },
        {
          arrayFormat: "repeat",
        }
      );

      return await axios.get<BaseResponse<UserResponseDTO[]>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/admin/user?${queryParams}`
      );
    },
    select: (data) => {
      if (data.data.status === "success") {
        return data.data.data;
      }
    },
  });

  if (response.isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!response.data) {
    return <div>No users found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateUserDialog role="faculty" />
      </div>
      <DataTable columns={departmentFacultyColumns} data={response.data} />
    </div>
  );
};
