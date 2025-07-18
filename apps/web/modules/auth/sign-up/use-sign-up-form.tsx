"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { roles, type Role } from "@webcampus/types/rbac";
import axios from "axios";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { v7 as uuid } from "uuid";
import z from "zod";

const signUpSchema = z.object({
  email: z.email("Invalid email address"),
  username: z.string().min(10, "USN is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(roles),
});

export const useSignUpForm = () => {
  /**
   * TODO: modify this
   */
  const { role = "student" } = useParams<{ role: Role }>();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: uuid(),
      role,
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const response = await axios.post("http://localhost:8080/user", data, {
      withCredentials: true,
    });

    console.log(response);
  };

  return {
    form,
    onSubmit,
  };
};
