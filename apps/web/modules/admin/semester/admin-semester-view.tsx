"use client";

import { useQuery } from "@tanstack/react-query";
import { dayjs } from "@webcampus/common/dayjs";
import { frontendEnv } from "@webcampus/common/env";
import {
  SemesterResponseType,
  SemesterTypeSchema,
} from "@webcampus/schemas/admin";
import { BaseResponse } from "@webcampus/types/api";
import { Button } from "@webcampus/ui/components/button";
import { Calendar } from "@webcampus/ui/components/calendar";
import { DataTable } from "@webcampus/ui/components/data-table";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import { Page, PageContent, PageHeader } from "@webcampus/ui/components/page";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@webcampus/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@webcampus/ui/components/select";
import { cn } from "@webcampus/ui/lib/utils";
import { DialogForm } from "@webcampus/ui/molecules/dialog-form";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { AdminSemesterColumns } from "./admin-semester-columns";
import { useSemesterCreateSchema } from "./use-semester-create-schema";

export const AdminSemesterView = () => {
  const { form, onSubmit } = useSemesterCreateSchema();
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const { data: semesters, isLoading } = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      return await axios.get<BaseResponse<SemesterResponseType[]>>(
        `${NEXT_PUBLIC_API_BASE_URL}/admin/semester`,
        {
          withCredentials: true,
        }
      );
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!semesters?.data.data || semesters?.data.data.length === 0) {
    return <div>No semesters found</div>;
  }
  return (
    <div>
      <Page>
        <PageHeader title="Semesters">
          <DialogForm
            title="Create Semester"
            trigger={"Create Semester"}
            form={form}
            onSubmit={onSubmit}
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {SemesterTypeSchema.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., 2024"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format("MMMM D, YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format("MMMM D, YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </DialogForm>
        </PageHeader>
        <PageContent>
          <DataTable
            columns={AdminSemesterColumns}
            data={semesters?.data.data}
          />
        </PageContent>
      </Page>
    </div>
  );
};
