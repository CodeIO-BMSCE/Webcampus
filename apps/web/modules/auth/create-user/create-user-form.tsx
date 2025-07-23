"use client";

import { Role } from "@webcampus/types/rbac";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import React from "react";
import { useCreateUserForm } from "./use-create-user-form";

interface CreateUserFormProps {
  role: Role;
  children?: React.ReactNode;
}

export const CreateUserForm = ({ role, children }: CreateUserFormProps) => {
  const { form, onSubmit } = useCreateUserForm({ role });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-6"}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{role === "student" ? "USN" : "Username"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Enter ${role === "student" ? "USN" : "Username"}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {children}
        </div>
      </form>
    </Form>
  );
};
