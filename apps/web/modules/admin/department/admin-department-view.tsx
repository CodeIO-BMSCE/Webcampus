"use client";

import { authClient } from "@/lib/auth-client";
import { DataTable } from "@/modules/student/courses/data-table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@webcampus/ui/components/skeleton";
import React from "react";
import { adminDepartmentColumns } from "./admin-department-columns";
import { CreateDepartmentView } from "./create-department-view";

export const AdminDepartmentView = () => {
  const response = useQuery({
    queryKey: ["department"],
    queryFn: async () => {
      return await authClient.admin.listUsers({
        query: {
          limit: 10,
          filterField: "role",
          filterValue: "department",
          filterOperator: "eq",
        },
      });
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

  if (!response.data?.data?.users) {
    return <div>No users found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateDepartmentView />
      </div>
      <DataTable
        columns={adminDepartmentColumns}
        data={response.data?.data?.users}
      />
    </div>
  );
};
