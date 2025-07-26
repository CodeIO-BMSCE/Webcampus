"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateSectionSchema,
  CreateSectionType,
  SectionResponseType,
} from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateSectionForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
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
      const response = await axios.post<BaseResponse<SectionResponseType>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/section`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      form.reset();
    },
    onError: (error: AxiosError<BaseResponse<SectionResponseType>>) => {
      toast.error(String(error.response?.data.error));
    },
  });
  const onSubmit = form.handleSubmit(async (data: CreateSectionType) => {
    createSectionMutation.mutate(data);
  });
  return { createSectionMutation, form, onSubmit };
};
