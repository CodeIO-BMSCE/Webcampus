"use client";

import { ResetPassword } from "@/modules/auth/reset-password/reset-password-view";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </React.Suspense>
  );
};

export default ResetPasswordPage;
