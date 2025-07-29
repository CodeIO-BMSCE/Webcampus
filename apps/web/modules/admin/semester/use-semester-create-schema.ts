"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateSemesterSchema,
  CreateSemesterType,
} from "@webcampus/schemas/admin";
import { ErrorResponse, SuccessResponse } from "@webcampus/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useSemesterCreateSchema = () => {
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const { data } = authClient.useSession();
  const queryClient = useQueryClient();
  const form = useForm<CreateSemesterType>({
    resolver: zodResolver(CreateSemesterSchema),
    defaultValues: {
      type: "odd",
      year: "",
      startDate: new Date(),
      endDate: new Date(),
      userId: data?.user?.id,
    },
  });

  const { mutate: createSemester } = useMutation({
    mutationFn: async (data: CreateSemesterType) => {
      return await axios.post(
        `${NEXT_PUBLIC_API_BASE_URL}/admin/semester`,
        data,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const onSubmit = (data: CreateSemesterType) => {
    createSemester(data);
  };

  return { form, onSubmit };
};
