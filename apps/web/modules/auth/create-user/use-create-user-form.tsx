"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserType } from "@webcampus/schemas";
import { type Role } from "@webcampus/types/rbac";
import axios from "axios";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

interface UseCreateUserFormProps {
  role: Role;
}

export const useCreateUserForm = ({ role }: UseCreateUserFormProps) => {
  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: nanoid(),
      role,
      username: "",
    },
  });

  const onSubmit = async (data: CreateUserType) => {
    const response = await axios.post("http://localhost:8080/user", data, {
      withCredentials: true,
    });
    console.log(response);
    form.reset();
  };

  return {
    form,
    onSubmit,
  };
};
