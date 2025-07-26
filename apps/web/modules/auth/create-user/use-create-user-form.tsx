"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserSchema,
  type CreateUserType,
} from "@webcampus/schemas/admin";
import { roles, type Role } from "@webcampus/types/rbac";
import axios from "axios";
import { useForm } from "react-hook-form";

interface UseCreateUserFormProps {
  role: Role;
  onUserCreated?: () => void;
}

export const useCreateUserForm = ({
  role,
  onUserCreated,
}: UseCreateUserFormProps) => {
  const queryClient = useQueryClient();
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
      axios.post("http://localhost:8080/user", data, { withCredentials: true }),
    onSuccess: () => {
      roles.forEach((role) => {
        queryClient.invalidateQueries({ queryKey: [role] });
      });
      form.reset();
      onUserCreated?.();
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
