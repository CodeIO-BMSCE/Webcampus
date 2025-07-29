"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { frontendEnv } from "@webcampus/common/env";
import { HODResponseDTO } from "@webcampus/schemas/department";
import { ErrorResponse, SuccessResponse } from "@webcampus/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useDepartmentFacultyActions = () => {
  const { data: session } = authClient.useSession();
  const { NEXT_PUBLIC_API_BASE_URL } = frontendEnv();
  const queryClient = useQueryClient();
  const { mutate: deleteFaculty } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.delete(`${NEXT_PUBLIC_API_BASE_URL}/admin/user`, {
        data: { userId },
        withCredentials: true,
      });
    },
    onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const { mutate: createHOD } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.post(
        `${NEXT_PUBLIC_API_BASE_URL}/department/hod`,
        { userId, departmentName: session?.user.name },
        { withCredentials: true }
      );
    },
    onSuccess: async (data: AxiosResponse<SuccessResponse<HODResponseDTO>>) => {
      toast.success(data.data.message);
      await queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const { data: hodData } = useQuery({
    queryKey: ["hod"],
    queryFn: async () => {
      return await axios.get(`${NEXT_PUBLIC_API_BASE_URL}/department/hod`, {
        params: {
          name: session?.user.name,
        },
        withCredentials: true,
      });
    },
    enabled: !!session?.user.name,
    select: (data) => {
      if (data.data.status === "success") {
        return data.data.data;
      }
    },
  });

  const { mutate: removeHOD } = useMutation({
    mutationFn: async (userId: string) => {
      return await axios.delete(`${NEXT_PUBLIC_API_BASE_URL}/department/hod`, {
        data: { userId, departmentName: session?.user.name },
        withCredentials: true,
      });
    },
    onSuccess: async (data: AxiosResponse<SuccessResponse<null>>) => {
      toast.success(data.data.message);
      await queryClient.invalidateQueries({ queryKey: ["hod"] });
      await queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  return {
    deleteFaculty,
    createHOD,
    hod: hodData,
    removeHOD,
  };
};
