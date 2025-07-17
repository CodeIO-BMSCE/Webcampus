"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const useFacultySignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await authClient.signIn.email(data, {
      onError: (error) => {
        toast.error(error.error.message);
      },
      onSuccess: () => {
        toast.success("Signed in successfully!");
        router.push("/student/dashboard");
      },
      onRetry: () => {
        toast.info("Retrying sign in...");
      },
    });
  };

  return {
    form,
    onSubmit,
  };
};
