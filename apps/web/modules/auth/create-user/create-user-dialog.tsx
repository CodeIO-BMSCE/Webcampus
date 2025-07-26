import { Role } from "@webcampus/types/rbac";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@webcampus/ui/components/form";
import { Input } from "@webcampus/ui/components/input";
import { capitalize } from "@webcampus/ui/lib/utils";
import { DialogForm } from "@webcampus/ui/molecules/dialog-form";
import React from "react";
import { useCreateUserForm } from "./use-create-user-form";

interface CreateUserDialogProps {
  role: Role;
}

export const CreateUserDialog = ({ role }: CreateUserDialogProps) => {
  const { form, onSubmit } = useCreateUserForm({
    role,
  });

  return (
    <DialogForm
      trigger={`Create ${capitalize(role)}`}
      title={`Create New ${capitalize(role)}`}
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
    </DialogForm>
  );
};
