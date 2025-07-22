"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserSchema, type CreateUserType } from "@webcampus/schemas";
import { roles, type Role } from "@webcampus/types/rbac";
import axios from "axios";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

interface UseCreateUserFormProps {
  role: Role;
}

export const useCreateUserForm = ({ role }: UseCreateUserFormProps) => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: (data: CreateUserType) =>
      axios.post("http://localhost:8080/user", data, { withCredentials: true }),
    onSuccess: () => {
      roles.forEach((role) => {
        queryClient.invalidateQueries({ queryKey: [role] });
      });
      form.reset();
      form.setValue("password", nanoid());
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
