"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { HODResponseDTO } from "@webcampus/schemas/department";
import { BaseResponse } from "@webcampus/types/api";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useDepartmentFacultyActions = () => {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const { mutate: deleteFaculty } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.delete<BaseResponse<null>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/admin/user`,
        {
          data: { userId },
          withCredentials: true,
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createHOD } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.post<BaseResponse<HODResponseDTO>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/hod`,
        { userId, departmentName: session?.user.name },
        { withCredentials: true }
      );
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      await queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error: AxiosError<BaseResponse<null>>) => {
      toast.error(error.response?.data?.error as string);
    },
  });

  const { data: hodData } = useQuery({
    queryKey: ["hod"],
    queryFn: async () => {
      return await axios.get<BaseResponse<HODResponseDTO>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/hod`,
        {
          params: {
            name: session?.user.name,
          },
          withCredentials: true,
        }
      );
    },
    enabled: !!session?.user.name,
  });

  const { mutate: removeHOD } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.delete<BaseResponse<null>>(
        `${frontendEnv().NEXT_PUBLIC_API_BASE_URL}/department/hod`,
        {
          data: { userId, departmentName: session?.user.name },
          withCredentials: true,
        }
      );
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      await queryClient.invalidateQueries({ queryKey: ["hod"] });
      await queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error: AxiosError<BaseResponse<null>>) => {
      toast.error(error.response?.data?.error as string);
    },
  });

  return {
    deleteFaculty,
    createHOD,
    hod: hodData?.data.data,
    removeHOD,
  };
};
