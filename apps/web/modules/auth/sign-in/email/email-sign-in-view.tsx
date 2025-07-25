"use client";

import { Role } from "@webcampus/types/rbac";
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
import { PasswordInput } from "@webcampus/ui/components/password-input";
import { capitalize } from "@webcampus/ui/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEmailSignInForm } from "./use-email-sign-in-form";

export const EmailSignIn = () => {
  const { role } = useParams<{ role: Role }>();
  const { form, onSubmit } = useEmailSignInForm({ role });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{capitalize(role)} sign in</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" />
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
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
