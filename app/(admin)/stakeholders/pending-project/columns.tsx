"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IStakeholderProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IStakeholderProjectData>[] = [
  {
    accessorKey: "stakeholder_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="StakeHolder" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["stakeholder_name"]}
            </span>
            <span className="uppercase font-semibold text-gray-500">
              {row.original["stakeholder_code"]}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold uppercase">
            {row.original["project_name"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "stakeholder_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      const { stakeholder_amount } = row.original;
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(stakeholder_amount)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "other_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Other Amount" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { other_amount } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{formatCurrency(other_amount)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">
            {formattedDate}
          </span>
        </div>
      );
    },
  },


  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-textPending bg-bgPending px-1 py-0.5 rounded-xl w-max">
          <span className="cursor-pointer">{row.original["status"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold flex gap-1 text-primaryLight-500">
          <Link
            href={`pending-project/approve/${row.original["id"]}`}
            className="cursor-pointer"
          >
            Approve
          </Link>
          /<span className="cursor-pointer text-red-500">Reject</span>
        </div>
      );
    },
  },
];
