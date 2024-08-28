"use client";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React from "react";
import { columns } from "./columns";
import { data } from "./data";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { useAddNewApartmentModal } from "@/store/modals/useCreateModal";
import useFacilityStore from "@/store/facility/useFacilityStore";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export interface IProjectFlatData {
  flat_id: number;
  flat_code: string;
  flat_desc: string;
}

interface IProps {
  params: { id: string };
}

const StaffApartmentPage = ({ params }: IProps) => {
  const code = params.id;
  const { setFlatData, setFlatFormType } = useFacilityStore();
  const { onOpen } = useAddNewApartmentModal();
  const AddAppartment = () => {
    setFlatFormType("add");
    onOpen();
  };

  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "project"
  )?.can_create;

  const { data, error, isPending } = useQuery({
    queryKey: ["get all apartments by project code", code],
    queryFn: async () =>
      getStuffTyped<IProjectFlatData[]>(
        `/project-flats/project-code/code?project_code=${code}`
      ),
    enabled: !!code,
  });
  return (
    <>
      <GoBack />
      <PageHead
        headText={`View Apartment (${data?.length || 0})`}
        subText="See all apartment details here"
        buttonText="Add Apartment"
        disabled={!CAN_CREATE}
        buttonAction={AddAppartment}
      />
      <DataTable columns={columns} data={data ?? []} isLoading={isPending} />
    </>
  );
};

export default StaffApartmentPage;
