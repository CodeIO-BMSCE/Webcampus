"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateCourseDTO,
  CreateCourseSchema,
} from "@webcampus/schemas/department";
import { ErrorResponse, SuccessResponse } from "@webcampus/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateCourseForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const form = useForm<CreateCourseDTO>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "",
      credits: 1,
      hasLab: false,
      departmentName: session?.user?.name,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (values: CreateCourseDTO) => {
      return await axios.post(
        `${NEXT_PUBLIC_API_BASE_URL}/department/course`,
        values,
        { withCredentials: true }
      );
    },
    onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const onSubmit = (values: CreateCourseDTO) => {
    mutate(values);
  };

  return {
    form,
    onSubmit,
  };
};
