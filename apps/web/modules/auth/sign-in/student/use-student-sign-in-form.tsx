"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const signInSchema = z.object({
  username: z.string().min(1, "USN is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const useStudentSignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await authClient.signIn.username(data, {
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
