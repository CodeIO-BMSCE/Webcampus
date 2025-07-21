"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const useResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const token = searchParams.get("token");
    if (!token || token === "undefined") {
      redirect("/auth/forgot-password");
    }
    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onError: (error) => {
          toast.error(error?.error?.message || "Failed to reset password");
        },
        onSuccess: () => {
          toast.success("Password reset successfully!");
          router.push("/student/dashboard");
        },
        onRetry: () => {
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
