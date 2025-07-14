"use client";

import { Button } from "@webcampus/ui/components/button";
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
import { useResetPasswordForm } from "./use-reset-password-form";

export const ResetPassword = () => {
  const { form, onSubmit } = useResetPasswordForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-6"}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
