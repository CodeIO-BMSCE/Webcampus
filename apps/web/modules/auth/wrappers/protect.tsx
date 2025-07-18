"use client";

import { authClient } from "@/lib/auth-client";
import { Permissions, Role } from "@webcampus/auth/rbac";
import React from "react";

interface ProtectProps {
  role: Role;
  permissions: Permissions;
  children: React.ReactNode;
}

export const Protect = ({ children, permissions }: ProtectProps) => {
  const hasPermission = authClient.organization.hasPermission({
    permissions,
  });
  console.log(hasPermission);

  if (!hasPermission) {
    return <div>401</div>;
  }

  return <div>{children}</div>;
};
