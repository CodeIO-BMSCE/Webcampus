"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { frontendEnv } from "@webcampus/common/env";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const useForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    await authClient.requestPasswordReset(
      {
        email: data.email,
        redirectTo: `${frontendEnv().NEXT_PUBLIC_FRONTEND_URL}/reset-password`,
      },
      {
        onError: (error) => {
          toast.dismiss();
          toast.error(error?.error?.message || "Failed to send mail");
        },
        onRequest: () => {
          toast.info("Sending reset password email...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Email sent successfully!");
        },
        onRetry: () => {
          toast.dismiss();
          toast.info("Retrying password reset...");
        },
      }
    );
  };

  return {
    form,
    onSubmit,
  };
};
