"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CashAdvanceFormTypes } from "@/store/cash-advance/useCashAdvanceStore";

export const columns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "cash_advance_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      const { cash_id } = row.original;
      return (
        <Link
          href={`cash-advance/details/${cash_id}`}
          className="flex flex-col font-semibold gap-2  capitalize"
        >
          <span className="underline text-primaryLight">
            {row.original["cash_advance_type"]}
          </span>
          <span className="uppercase">{row.original["request_code"]}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },
  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Staff Name" />;
    },
    cell: ({ row }) => {
      const { staff_name } = row.original;
      return (
        <div className="flex gap-1.5 items-center">
          <AvatarComponent />
          <span>{staff_name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "amount_collected",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Amount Collected"
          className="w-1/2"
        />
      );
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amount_collected"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount_recorded",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Recorded" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amount_recorded"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Balance" />;
    },
    cell: ({ row }) => {
      const bal = formatCurrency(row.getValue("balance"));
      return (
        <div className="flex gap-2 items-center">
          <span>{bal}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const fromatted = formatDate(createdAt);
      return <span>{fromatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
  },
];
