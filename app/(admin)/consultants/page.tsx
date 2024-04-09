"use client";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllConsultantData } from "@/store/consultants/useConsultantStore";

export default function ConsultantsPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all consultants"],
    queryFn: getAllConsultantData,
  });
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Consultants"
          subTitle="View all consultants here"
          buttonText="Add consultant"
          href="consultants/add-consultant"
        />
      </div>
      <DataTable columns={columns} isLoading={isPending} data={data ?? []} />
    </div>
  );
}
