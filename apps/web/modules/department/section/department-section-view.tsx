"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { SectionResponseType } from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";
import { DataTable } from "@webcampus/ui/components/data-table";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import { DialogForm } from "@webcampus/ui/molecules/dialog-form";
import axios from "axios";
import { DepartmentSectionColumns } from "./department-section-columns";
import { useCreateSectionForm } from "./use-create-section-form";

export const DepartmentSectionView = () => {
  const { data: session } = authClient.useSession();
  const { form, onSubmit } = useCreateSectionForm();
  const { data, isLoading } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      return await axios.get<BaseResponse<SectionResponseType[]>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/section`,
        {
          params: {
            departmentName: session?.user?.name,
          },
          withCredentials: true,
        }
      );
    },
    select: (data) => {
      if (data.data.status === "success") {
        return data.data.data;
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <DialogForm
          trigger="Add Section"
          title="Add Section"
          form={form}
          onSubmit={onSubmit}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Section Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Semester" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </DialogForm>
      </div>
      <DataTable columns={DepartmentSectionColumns} data={data} />
    </div>
  );
};
