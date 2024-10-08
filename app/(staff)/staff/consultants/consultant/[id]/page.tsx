"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import { api } from "@/config/api";
import {
  useGetAllConsultantProjects,
  useGetConsultantProject,
} from "@/hooks/useSelectOptions";
import { IConsultantDetailsData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { columns } from "./columns";
import useConsultantStore from "@/store/consultants/useConsultantStore";
import { useAddToProjectModal } from "@/store/modals/useCreateModal";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

type Params = {
  params: {
    id: string;
  };
};

export default function ConsultantDetailsPage({ params }: Params) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "consultant"
  )?.can_create;

  const { projects } = useGetAllConsultantProjects();
  const { onOpen, setAddToProjectFormType } = useAddToProjectModal();
  const showModal = () => {
    setAddToProjectFormType("consultant");
    onOpen();
  };
  const { setConsultantDetailsData } = useConsultantStore();

  const { data, isPending, error } = useQuery({
    queryKey: ["get consultant details"],
    queryFn: async () => {
      try {
        const response = await api.get<IConsultantDetailsData>(
          `/consultants/${params.id}`
        );

        setConsultantDetailsData(response.data);
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

  const projectDetails = projects?.filter(
    (item) => item.consultant_id === data?.consultant_code
  );

  return (
    <>
      <GoBack />
      <div>
        <div className="grid md:grid-cols-6 gap-10 pt-10">
          {/* details */}
          <div className="bg-white rounded-lg md:col-span-4 ">
            <h2 className="border-b p-7 text-lg font-semibold">
              Consultant Details
            </h2>
            <div className="p-7 flex flex-col justify-between  gap-5 md:flex-row pb-28 flex-wrap">
              <div className="flex flex-col gap-1 ">
                <span className="font-semibold">Name:</span>
                <span className="md:text-[1rem]">{data?.name}</span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span className="font-semibold">Type:</span>
                <span className="md:text-[1rem]">{data?.type}</span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span className="font-semibold">Contact Mobile:</span>
                <span className="md:text-[1rem]">{data?.contact}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Email:</span>
                <p className="md:text-[1rem]">{data?.email}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Website:</span>
                <span className="md:text-[1rem]">{data?.website}</span>
              </div>
            </div>
          </div>

          <div className="bg-white flex-col flex max-w-xs rounded-lg md:col-span-2 auto-rows-min min-h-[20rem] md:max-w-full">
            <h2 className="border-b p-7 text-lg font-bold">Quick Actions</h2>

            <div className="flex flex-col">
              <div className="flex gap-5 items-center border-b p-8">
                <Link
                  href={`/staff/consultants/edit-consultant/ ${data?.id}`}
                  className="text-primaryLight-500 font-semibold">
                  <span className="text-sm">Edit Consultant Information</span>
                </Link>
              </div>
              {/* <div className="flex gap-5 items-center p-8">
                {CAN_CREATE ? (
                  <div
                    className="text-primaryLight-500 font-semibold  cursor-pointer"
                    onClick={showModal}>
                    <span className="text-sm">Add to Project</span>
                  </div>
                ) : null}
              </div> */}
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={projectDetails || []}
        />
      </div>
    </>
  );
}
