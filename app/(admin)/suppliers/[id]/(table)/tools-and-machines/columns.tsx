"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatToNaira } from "@/utils/formatCurrency";
import { formatDate, twelveHourTime } from "@/utils/formatDate";
import { IToolAndMachineryData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import EditColumn from "./edit-column-component";

export const materialsColumns: ColumnDef<IToolAndMachineryData>[] = [
  {
    accessorKey: "mat_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      const { description } = row.original;

      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div className="space-y-1">
            <span className="font-semibold capitalize border-b text-primaryLight border-primaryLight/70">
              {description}
            </span>
            <p>IVGSH776f</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "procurement_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Procurement Type" />;
    },
    cell: ({ row }) => {
      const { procurement_type } = row.original;

      return (
        <div className="">
          <span className="font-semibold ">{`${procurement_type}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_cost",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Total Cost" />;
    },
    cell: ({ row }) => {
      return <p className="font-semibold">{formatToNaira(1000000)}</p>;
    },
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <AvatarComponent />
          <p className="font-semibold">Alison Ogaga</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return (
        <div>
          <p className="font-semibold">{formatDate(createdAt as string)}</p>
          <p>{twelveHourTime(createdAt)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" withSort={false} />;
    },
    cell: ({ row }) => {
      return <EditColumn row={row} />;
    },
  },
];
