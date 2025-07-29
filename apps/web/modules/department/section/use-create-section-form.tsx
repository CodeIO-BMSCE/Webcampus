"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateSectionSchema,
  CreateSectionType,
} from "@webcampus/schemas/department";
import { ErrorResponse, SuccessResponse } from "@webcampus/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateSectionForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const form = useForm({
    resolver: zodResolver(CreateSectionSchema),
    defaultValues: {
      name: "",
      departmentName: session?.user?.name as string,
      semester: 1,
    },
  });
  const createSectionMutation = useMutation({
    mutationFn: async (data: CreateSectionType) => {
      return await axios.post(
        `${NEXT_PUBLIC_API_BASE_URL}/department/section`,
        data,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });
  const onSubmit = async (data: CreateSectionType) => {
    createSectionMutation.mutate(data);
  };
  return { createSectionMutation, form, onSubmit };
};
