import { api } from '@/config/api';
import { useGetEachReport } from '@/store/report/ReportStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useAddReportMutation = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.post(`/project_report/`, data);
        return response.data.data;
      } catch (err) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {},
    onError: (error: Error) => {
      return error;
    },
  });

  return { action: mutate, isSuccess, isPending, isError, error };
};

export default useAddReportMutation;

const useEditReportMutation = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["editReport"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.put(`/project_report/${data.id}`, data);
        return response.data.data;
      } catch (err) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {},
    onError: (error: Error) => {
      return error;
    },
  });

  return { action: mutate, isSuccess, isPending, isError, error };
};

export { useEditReportMutation };