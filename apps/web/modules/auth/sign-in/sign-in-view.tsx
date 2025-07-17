"use client";

import { CoordinatorSignIn } from "@/modules/auth/sign-in/coordinator/coordinator-sign-in-view";
import { FacultySignIn } from "@/modules/auth/sign-in/faculty/faculty-sign-in-view";
import { StudentSignIn } from "@/modules/auth/sign-in/student/student-sign-in-view";
import { Role } from "@webcampus/auth/rbac";
import React from "react";

export const SignIn = ({ role }: { role: Role }) => {
  const components: Record<Role, React.JSX.Element> = {
    student: <StudentSignIn />,
    faculty: <FacultySignIn />,
    coordinator: <CoordinatorSignIn />,
  };
  return <div>{components[role]}</div>;
};
