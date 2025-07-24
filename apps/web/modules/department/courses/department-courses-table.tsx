"use client";

import { DataTable } from "@/modules/student/courses/data-table";
import { useQuery } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import axios from "axios";
import React from "react";
import { DepartmentCoursesColumns } from "./department-courses-columns";

export const DepartmentCoursesTable = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      axios.get(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/course/branch`,
        {
          params: { name: "Computer Science" },
          withCredentials: true,
        }
      ),
  });
  console.log(courses?.data);
  if (isLoading) return <div>Loading...</div>;
  return (
    <DataTable columns={DepartmentCoursesColumns} data={courses?.data.data} />
  );
};
