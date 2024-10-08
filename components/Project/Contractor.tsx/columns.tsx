"use client";

import { DeleteCell } from "@/app/(admin)/facility/all-flats/EditCell";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IContractorProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IContractorProjectData>[] = [
  {
    accessorKey: "contractor_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contractor Name" />;
    },
    cell: ({ row }) => {
      const { contractor_name, contractor_code } = row.original;
      return (
        <div className="flex flex-col text-primaryLight gap-1 font-semibold">
          <p className="">{contractor_name}</p>
          <p className="text-textColor font-normal uppercase">{contractor_code}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "contractor_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Requested Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      const amount = row.original.contractor_amount;
      const formattedAmount = formatCurrency(amount);
      return <span className="font-semibold ">{formattedAmount}</span>;
    },
  },

  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Approved Amount"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const amount = row.original.approved_amount;
      const formattedAmount = formatCurrency(amount);
      return <span className="font-semibold ">{formattedAmount}</span>;
    },
  },

  {
    accessorKey: "created_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added by" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AvatarComponent />
          <span>{row.original.created_by}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span className="w-16">{row.original.service ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.comment}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatted = formatDate(createdAt);
      return (
        <div className="">
          <p className="">{formatted}</p>
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
        <DeleteCell
          rowId={row.original.id}
          row={row}
          query="get all contractors by project code"
          url="contractor-projects"
        />
      );
    },
  },
];
