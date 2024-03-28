import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/utils/types";
import useAuthStore from "@/store/auth/AuthStore";
import { api } from "@/config/api";
import axios from "axios";

const useLogin = () => {
  const { setUser } = useAuthStore();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const response = await api.post<LoginResponse>("/login", credentials);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      setUser(data.data, data.token);
    },
    onError: (error: Error) => {
      return error;
    },
  });

  return { login: mutate, isPending, isSuccess, isError, error };
};

export default useLogin;