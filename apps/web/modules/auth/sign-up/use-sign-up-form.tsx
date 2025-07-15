"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

const signUpSchema = z.object({
  /**
   * TODO: Verify whether an (USN, email) pair exists using actual data.
   */
  email: z.email("Invalid email address"),
  username: z.string().min(10, "USN is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export const useSignUpForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await authClient.signUp.email(data, {
      onError: (error) => {
        toast.error(error.error.message);
      },
      onSuccess: () => {
        toast.success("Signed up successfully!");
        router.push("/student/dashboard");
      },
      onRetry: () => {
        toast.info("Retrying sign up...");
      },
    });
  };

  return {
    form,
    onSubmit,
  };
};
