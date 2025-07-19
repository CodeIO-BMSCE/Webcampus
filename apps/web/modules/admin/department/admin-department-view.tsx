import { authClient } from "@/lib/auth-client";
import { CreateUserDialog } from "@/modules/auth/create-user/create-user-dialog";
import React from "react";

export const AdminDepartmentView = async () => {
  const { data } = await authClient.admin.listUsers({
    query: {
      limit: 10,
    },
  });
  console.log(data);

  if (!data?.users) {
    return null;
  }

  return (
    <div>
      {/* <DataTable columns={adminDepartmentColumns} data={data?.users} /> */}
      <CreateUserDialog role="department" />
    </div>
  );
};
