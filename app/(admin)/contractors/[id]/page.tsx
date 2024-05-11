"use client";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React, { useEffect } from "react";
import { columns } from "./columns";
import { useRouter, useParams } from "next/navigation";
import useContractorsActionsStore from "@/store/actions/contractorsActions";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IContractorProjectData } from "@/utils/types";

const SingleContractor = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedItem = useContractorsActionsStore<any>(
    (state) => state.selectedItem
  );
  const getContractorById = useContractorsActionsStore<any>(
    (state) => state.getContractorById
  );
  const contractors = useContractorsActionsStore<any>(
    (state: any) => state.items
  );
  const getAllContractors = useContractorsActionsStore<any>(
    (state: any) => state.getAllContractors
  );

  useEffect(() => {
    getAllContractors();
  }, [getAllContractors]);

  useEffect(() => {
    if (params.id) {
      getContractorById(params.id);
    }
  }, [getContractorById, params.id]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [
      "get all contractor projects by contractor code",
      selectedItem?.contractor_code,
    ],
    queryFn: async () =>
      getStuffTyped<IContractorProjectData[]>(
        `/contractor-projects/contractor-code/${selectedItem?.contractor_code}`
      ),
    refetchOnMount: "always",
  });

  return (
    <>
      <GoBack />

      <div>
        <PageHead
          headText={selectedItem && selectedItem.contractor_name}
          subText={selectedItem && selectedItem.contractor_code}
          buttonText="Edit Contractor"
          buttonAction={() =>
            selectedItem && router.push(`/contractors/${selectedItem.id}/edit`)
          }
        />
        <div className="gap-5 my-10">
          <div className="col-span-2 bg-white rounded-lg border-[#D0D5DD] ">
            <div className="p-5 border-b border-b-gray-300">
              <h1 className="text-[#101928] text-[18px] font-[600]">
                Contractor Details
              </h1>
            </div>

            <div className="grid grid-cols-4 p-5 gap-5">
              <div>
                <p className="text-[#475367] text-sm">Contractor Name:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contractor_name}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Contractor Code:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contractor_code}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Contractor Phone:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contractor_ofc_phone}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Address:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contractor_address}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Contact Person:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contact_person}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Contact Mobile:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contact_mobile}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Contact Home Phone:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contact_home_phone}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Email:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.email}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Website:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.website}
                </p>
              </div>

              <div>
                <p className="text-[#475367] text-sm">Service:</p>
                <p className="text-[#101928] text-[16px] font-[600]">
                  {selectedItem && selectedItem.contractor_service}
                </p>
              </div>
            </div>
          </div>
        </div>
        <PageHead
          headText="Projects"
          subText="View all your contractor's projects here"
        />
        <DataTable
          columns={columns}
          data={data ?? []}
          isLoading={isPending}
          isError={isError}
          errorMessage={error?.message ?? "Something went wrong"}
        />
      </div>
    </>
  );
};

export default SingleContractor;
