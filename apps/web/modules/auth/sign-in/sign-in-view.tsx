"use client";

import { CoordinatorSignIn } from "@/modules/auth/sign-in/coordinator/coordinator-sign-in-view";
import { FacultySignIn } from "@/modules/auth/sign-in/faculty/faculty-sign-in-view";
import { StudentSignIn } from "@/modules/auth/sign-in/student/student-sign-in-view";
import { Role } from "@webcampus/types/rbac";
import React from "react";

export const SignIn = ({ role }: { role: Role }) => {
  const components: Record<Role, React.JSX.Element | null> = {
    student: <StudentSignIn />,
    faculty: <FacultySignIn />,
    coordinator: <CoordinatorSignIn />,
    hod: null,
    coe: null,
    department: null,
    admin: null,
  };
  return <div>{components[role]}</div>;
};
