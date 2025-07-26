"use client";

import { authClient } from "@/lib/auth-client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { SectionResponseType } from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";
import { Button } from "@webcampus/ui/components/button";
import { DataTable } from "@webcampus/ui/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@webcampus/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import axios from "axios";
import { DepartmentSectionColumns } from "./department-section-columns";
import { useCreateSectionForm } from "./use-create-section-form";

export const DepartmentSectionView = () => {
  const { data: session } = authClient.useSession();
  const { form, onSubmit } = useCreateSectionForm();
  const { data, isLoading } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await axios.get<BaseResponse<SectionResponseType[]>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/section`,
        {
          params: {
            departmentName: session?.user?.name,
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Section</Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle>Add Section</DialogTitle>
                </DialogHeader>

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
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Continue</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={DepartmentSectionColumns} data={data} />
    </div>
  );
};
