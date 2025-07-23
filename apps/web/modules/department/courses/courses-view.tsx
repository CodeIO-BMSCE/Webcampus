"use client";

import { Button } from "@webcampus/ui/components/button";
import { Checkbox } from "@webcampus/ui/components/checkbox";
import {
  Form,
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
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Create New Course
        </h2>
        <p className="text-gray-600">
          Fill in the details to create a new course
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Code */}
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

          {/* Course Name */}
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

          {/* Course Type and Credits Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Course Type */}
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

            {/* Credits */}
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

          {/* Has Lab */}
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="min-w-[120px]"
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </Form>

      <DepartmentCoursesTable />
    </div>
  );
};
