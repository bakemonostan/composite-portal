"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ContractorType = {
  id: string;
  contractorCode: string;
  projectCode: string;
  createdBy: string;
  amount: string;
  createdOn: string;
  service: string;
  status: string;
  actions: string;
};

export const columns: ColumnDef<ContractorType>[] = [
  {
    accessorKey: "contractorCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contractor Code" />;
    },
    cell: ({ row }) => {
      console.log("Row data", row)
      return (
        <div className="flex gap-2 items-center">
          <div>
            <p className="bold">{row.original.contractor_code}</p>
          </div>
        </div>
      );
    },
  },

//   {
//     "id": 4,
//     "contractor_code": "con-0003",
//     "contractor_name": "Demo",
//     "contractor_service": "Demo",
//     "contractor_address": "Demo",
//     "contractor_ofc_phone": "Demo",
//     "contact_person": "Demo",
//     "contact_mobile": "Demo",
//     "contact_home_phone": "Demo",
//     "email": "Demo@gmail.com",
//     "website": "Demo",
//     "comment": "Demo",
//     "createdAt": "2024-04-02T10:14:53.782Z",
//     "updatedAt": "2024-04-02T10:14:53.782Z"
// }
  {
    accessorKey: "projectCode",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Code" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold "></span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Created By" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AvatarComponent />
          <span className="font-semibold ">Alison Ogaga</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">N100,000</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>6th July, 2002</p>
          <p>10am</p>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span>Interior</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>Completed</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
      );
    },
  },
];
