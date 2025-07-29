"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { createUserSchema, CreateUserType } from "@webcampus/schemas/admin";
import {
  CreateDepartmentDTO,
  CreateDepartmentSchema,
} from "@webcampus/schemas/department";
import { ErrorResponse } from "@webcampus/types/api";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateDepartmentForm = () => {
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const queryClient = useQueryClient();
  const form = useForm<CreateDepartmentDTO & CreateUserType>({
    resolver: zodResolver(
      CreateDepartmentSchema.extend(createUserSchema.shape)
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "password",
      username: "",
      role: "department",
    },
  });

  const { mutate: createDepartment } = useMutation({
    mutationFn: (data: CreateDepartmentDTO & CreateUserType) => {
      return axios.post(`${NEXT_PUBLIC_API_BASE_URL}/admin/department`, data, {
        withCredentials: true,
      });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const onSubmit = async (data: CreateDepartmentDTO & CreateUserType) => {
    createDepartment(data);
  };

  return { form, onSubmit };
};
