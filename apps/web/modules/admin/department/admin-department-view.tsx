"use client";

import { authClient } from "@/lib/auth-client";
import { CreateUserDialog } from "@/modules/auth/create-user/create-user-dialog";
import { DataTable } from "@/modules/student/courses/data-table";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { adminDepartmentColumns } from "./admin-department-columns";

export const AdminDepartmentView = () => {
  const response = useQuery({
    queryKey: ["Departments"],
    queryFn: async () => {
      return await authClient.admin.listUsers({
        query: {
          limit: 10,
        },
      });
    },
  });

  if (!response.data?.data?.users) {
    return <div>No users found</div>;
  }

  return (
    <div>
      <DataTable
        columns={adminDepartmentColumns}
        data={response.data?.data?.users}
      />
      <CreateUserDialog role="department" />
    </div>
  );
};
