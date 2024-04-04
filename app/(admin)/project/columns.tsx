"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalWorker: string;
  worker: string;
  materials: string;
};

// export type ReportType = {
//   id: string;
//   project_name: string;
//   project_description: string;
//   project_code: string;
//   project_location: string;
//   address: string;
//   city: string;
//   state: string;
//   lga: string;
//   project_duration: string;
//   start_date: string;
//   end_date: string;
//   comment: string;
//   status: string;
//   date_added: string;
//   project_supervisor: string;
//   supervisor_id: string;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
// }
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/project/${row.original["id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["project_name"]}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Start Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["start_date"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="End Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["end_date"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>{row.original["status"]}</p>
        </div>
      );
    },
  },
  
  {
    accessorKey: "supervisor",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Supervisor" withSort={false}/>;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">{row.original["project_supervisor"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      // const onOpen = useAddWorkerModal(state => state.onOpen);
      return (
        <Link href={"/project/add-worker"}>
          <div className="cursor-pointer" >
            <span className="font-semibold text-primaryLight-500 flex items-center hover:underline"><HiUserAdd />Add </span>
          </div>
        </Link>
      );
    },
  },
];
