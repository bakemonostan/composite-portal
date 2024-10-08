
"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { convertDateFormat } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type ReportType = {
  inventory_id: string;
  inventory_code: string;
  name: string;
  unit_price: string;
  quantity: string;
  type: string;
  total_price: string;
  total_quantity: string;
  remaining_quantity: string;
  created_by: string,
  updated_by: string,
  createdbyname: string,
  createdAt: string
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      const { inventory_code } = row.original;
      return (
        <div className="flex gap-2 flex-col cursor-pointer">
          <span className="w-32 font-semibold  truncate ">
            {row.getValue("name")}
          </span>
          <span className="w-32 font-semibold uppercase">{inventory_code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_quantity",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Quantity" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.getValue("total_quantity")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Quantity Left" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.getValue("quantity") ?? "-"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p>{row.getValue("type")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdbyname",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.getValue("createdbyname")}</span>
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
      return (
        <div>
          <p>{convertDateFormat(row.getValue("createdAt"))}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "inventory_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/staff/inventory/${row.getValue("inventory_id")}`}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          View
        </Link>
      );
    },
  },
];
