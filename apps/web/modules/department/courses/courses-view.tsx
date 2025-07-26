"use client";

import { Checkbox } from "@webcampus/ui/components/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@webcampus/ui/components/select";
import { DialogForm } from "@webcampus/ui/molecules/dialog-form";
import React from "react";
import { DepartmentCoursesTable } from "./department-courses-table";
import { useCreateCourseForm } from "./use-create-course-form";

const COURSE_TYPES = [
  { value: "core", label: "Core" },
  { value: "elective", label: "Elective" },
  { value: "lab", label: "Laboratory" },
  { value: "seminar", label: "Seminar" },
  { value: "project", label: "Project" },
] as const;

export const CoursesView: React.FC = () => {
  const { form, onSubmit } = useCreateCourseForm();

  return (
    <div>
      <div className="flex justify-end">
        <DialogForm
          trigger="Create New Course"
          title="Create New Course"
          form={form}
          onSubmit={onSubmit}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Code *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., CS101, MATH201"
                    {...field}
                    className="uppercase"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Introduction to Computer Science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COURSE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credits *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="e.g., 3"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="hasLab"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Has Laboratory Component</FormLabel>
                  <p className="text-muted-foreground text-sm">
                    Check this if the course includes practical/lab sessions
                  </p>
                </div>
              </FormItem>
            )}
          />
        </DialogForm>
      </div>
      <DepartmentCoursesTable />
    </div>
  );
};
