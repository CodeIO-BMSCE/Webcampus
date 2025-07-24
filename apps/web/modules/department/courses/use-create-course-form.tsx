"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateCourseDTO,
  CreateCourseSchema,
} from "@webcampus/schemas/department";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateCourseForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
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
    mutationFn: async (values: CreateCourseDTO) =>
      axios.post(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/course`,
        values,
        { withCredentials: true }
      ),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      form.reset();
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
