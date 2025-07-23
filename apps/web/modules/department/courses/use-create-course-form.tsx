import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import {
  CreateCourseDTO,
  CreateCourseSchema,
} from "@webcampus/schemas/department";
import axios from "axios";
import { useForm } from "react-hook-form";

export const useCreateCourseForm = () => {
  const form = useForm<CreateCourseDTO>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "",
      credits: 1,
      hasLab: false,
      branch: "cse",
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
      console.log(data);
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
