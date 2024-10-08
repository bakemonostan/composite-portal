"use client";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { data } from "../consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import useManageStaffStore from "@/store/manage-staff/useManageStaffStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { ApiResponse, IManageStaffData } from "@/utils/types";
import axios from "axios";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ManageStaffPage() {
  const { setStaffData } = useManageStaffStore();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "staff"
  )?.can_create;
  const { data, error, isPending } = useQuery({
    queryKey: ["get all staff"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IManageStaffData[]>>(
          "/staffs"
        );
        setStaffData(response.data.data);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    refetchOnMount: "always",
  });
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title={`Manage Staff (${data?.length ?? "0"})`}
          subTitle="View all staff here"
          disabled={!CAN_CREATE}
          buttonText="Add Staff"
          href="manage-staff/add"
        />
      </div>
      <DataTable columns={columns} isLoading={isPending} data={data ?? []} />
    </div>
  );
}
