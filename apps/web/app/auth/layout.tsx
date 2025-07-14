import { AuthView } from "@/modules/auth/layouts/auth-view";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthView>{children}</AuthView>;
};

export default AuthLayout;
