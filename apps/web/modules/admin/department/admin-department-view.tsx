"use client";

import { useQuery } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { UserResponseType } from "@webcampus/schemas/admin";
import { SuccessResponse } from "@webcampus/types/api";
import { DataTable } from "@webcampus/ui/components/data-table";
import { Page, PageContent, PageHeader } from "@webcampus/ui/components/page";
import { Skeleton } from "@webcampus/ui/components/skeleton";
import axios from "axios";
import React from "react";
import { adminDepartmentColumns } from "./admin-department-columns";
import { CreateDepartmentView } from "./create-department-view";

export const AdminDepartmentView = () => {
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const response = useQuery({
    queryKey: ["department"],
    queryFn: async () => {
      return await axios.get<SuccessResponse<UserResponseType[]>>(
        `${NEXT_PUBLIC_API_BASE_URL}/admin/user`,
        {
          params: {
            role: "department",
          },
        }
      );
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

  if (!response.data?.data.data) {
    return <div>No departments found</div>;
  }

  return (
    <Page>
      <PageHeader title="Departments">
        <CreateDepartmentView />
      </PageHeader>
      <PageContent>
        <DataTable
          columns={adminDepartmentColumns}
          data={response.data?.data.data}
        />
      </PageContent>
    </Page>
  );
};
