"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IConsultantProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IConsultantProjectData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Consultant" />;
    },
    cell: ({ row }) => {
      const { name, id } = row.original;
      return (
        <div className="flex flex-col text-primaryLight gap-1 font-semibold">
          <Link
            href={`/consultants/consultant/${id}`}
            className="block cursor-pointer"
          >
            {name}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "consultant_id",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Consultant Code"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold uppercase">
          {row.original.consultant_id}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Amount" withSort={false} />;
  //   },
  //   cell: ({ row }) => {
  //     const amount = row.original.approved_amount;
  //     const formattedAmount = formatCurrency(amount);
  //     return <span className="font-semibold ">N,100,000</span>;
  //   },
  // },

  // {
  //   accessorKey: "created_by",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Added by" withSort={false} />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-2">
  //         <AvatarComponent />
  //         <span className="w-16">{row.original.created_by}</span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => {
  //     return (
  //       <ColumnHeader column={column} title="Date Added" withSort={false} />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const { createdAt } = row.original;
  //     const formatted = formatDate(createdAt);
  //     return (
  //       <div className="">
  //         <p className="">{formatted}</p>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
            <HiPencilAlt />
            Edit{" "}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline text-red-500 font-semibold">
            Delete
          </span>
        </div>
      );
    },
  },
];
