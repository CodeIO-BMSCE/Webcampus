"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateSemesterSchema,
  CreateSemesterType,
  SemesterResponseType,
} from "@webcampus/schemas/admin";
import { BaseResponse } from "@webcampus/types/api";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useSemesterCreateSchema = () => {
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const { data } = authClient.useSession();
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
  console.log(form.formState.errors);

  const { mutate: createSemester } = useMutation({
    mutationFn: async (data: CreateSemesterType) => {
      return await axios.post<BaseResponse<SemesterResponseType>>(
        `${NEXT_PUBLIC_API_BASE_URL}/admin/semester`,
        data
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onError: (error: AxiosError<BaseResponse<null>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const onSubmit = (data: CreateSemesterType) => {
    createSemester(data);
  };

  return { form, onSubmit };
};
