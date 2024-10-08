"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableAction from "./details/(forms_and_modals)/TableAction";
import { CashAdvanceFormTypes } from "@/store/cash-advance/useCashAdvanceStore";
import EditCell, { ViewCell } from "../facility/all-flats/EditCell";

export const approvedColumns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "cash_advance_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  gap-0.5 flex-col">
          <span className="font-semibold">
            {row.original["cash_advance_type"]}
          </span>
          <span className="uppercase">{row.original["request_code"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "amount_collected",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Collected" />;
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
      const amt = formatCurrency(row.getValue("balance"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "action_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Submitted by" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span>{row.getValue("action_by") ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Submitted on" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const fromatted = formatDate(createdAt);
      return <span>{fromatted}</span>;
    },
  },

  {
    accessorKey: "cash_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const { decision } = row.original;
      return (
        <>
          {decision === "Approved" ? (
            <p className="font-semibold text-textColor-500 uppercase disabled cursor-not-allowed w-max px-1 p-.5">
              {decision}
            </p>
          ) : null}
        </>
      );
    },
  },

  {
    accessorKey: "decision",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      const { decision, cash_id } = row.original;
      return (
        <span
          className={`${
            decision === "Approved" ? "text-success" : "text-error"
          } font-semibold`}
        >
          {decision === "Approved" ? (
            <Link
              href={`/cash-advance/${cash_id}/approved-details`}
              className="underline text-primaryLight"
            >
              View
            </Link>
          ) : (
            decision ?? "Pending"
          )}
        </span>
      );
    },
  },
];
