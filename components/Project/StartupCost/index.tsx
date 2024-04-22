"use client";
import { DataTable } from "@/components/shared/DataTable";
import React from "react";
import { columns } from "./columns";
import { data } from "./data";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, IStartupCostProjectData } from "@/utils/types";
import axios from "axios";
import { api } from "@/config/api";

const StartupCost = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all startup cost by project code"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IStartupCostProjectData[]>>(
          `/startup-costs/project-code/${projectCode}`
        );
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });
  return (
    <div>
      <h2 className="text-[20px] font-[600]">Startup Cost</h2>
      <DataTable
        showSearch={false}
        isLoading={isPending}
        columns={columns}
        data={data ?? []}
      />
    </div>
  );
};

export default StartupCost;
