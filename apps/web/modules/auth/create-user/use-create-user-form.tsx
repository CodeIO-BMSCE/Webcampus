"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  createUserSchema,
  type CreateUserType,
} from "@webcampus/schemas/admin";
import { roles, type Role } from "@webcampus/types/rbac";
import axios from "axios";
import { useForm } from "react-hook-form";

interface UseCreateUserFormProps {
  role: Role;
}

export const useCreateUserForm = ({ role }: UseCreateUserFormProps) => {
  const queryClient = useQueryClient();
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "password",
      role,
      username: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateUserType) =>
      axios.post(`${NEXT_PUBLIC_API_BASE_URL}/admin/user`, data, {
        withCredentials: true,
      }),
    onSuccess: () => {
      roles.forEach((role) => {
        queryClient.invalidateQueries({ queryKey: [role] });
      });
      form.reset();
    },
  });

  const onSubmit = (data: CreateUserType) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
  };
};
