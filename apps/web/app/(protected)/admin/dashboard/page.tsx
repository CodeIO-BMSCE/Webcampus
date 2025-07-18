import { CreateUserDialog } from "@/modules/auth/create-user/create-user-dialog";
import React from "react";

const AdmindDashboardPage = () => {
  return (
    <div>
      <CreateUserDialog role="department" />
    </div>
  );
};

export default AdmindDashboardPage;
