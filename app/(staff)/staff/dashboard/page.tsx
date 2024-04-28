"use client";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { getAllrequest } from "@/store/requests/RequestStore";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import {
  getStuffTyped,
  useGetAllStaffs,
  useGetStaffDetails,
} from "@/hooks/useSelectOptions";
import { IRequestData, IStaffDetailsData } from "@/utils/types";

export default function StaffDashboardPage() {
  const { userId } = userStore();
  const { staffDetails, isLoading } = useGetStaffDetails(userId);

  const { data, error, isPending } = useQuery({
    queryKey: ["get staffbaord request", userId],
    queryFn: () => getStuffTyped<IRequestData[]>(`/requests/user/${userId}`),
  });

  return (
    <div>
      <PageHeaderComponent
        title={
          isLoading ? "Welcome User" : `Welcome ${staffDetails?.firstname}`
        }
        subTitle="This is your dashboard, an overview of everything going on."
        buttonText="New Request"
        href="/staff/create-request"
      />

      <div className="grid-cols-1">
        <div className="xl:col-span-6">
          <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
            <DashboardCard title="Total Requests" description="123" />
            <DashboardCard title="Approved Requests" description="13" />
            <DashboardCard title="Pending Requests" description="32" />
            <DashboardCard title="Rejected Requests" description="233" />
          </div>
          <DataTable
            columns={columns}
            isLoading={isPending}
            data={data ?? []}
          />
        </div>
      </div>
    </div>
  );
}
