"use client";

import { DeleteCell } from "@/app/(admin)/facility/all-flats/EditCell";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
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
        <div className="flex flex-col gap-1 font-semibold">
          <span className="block cursor-pointer">{name}</span>
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

  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" withSort={false} />;
    },
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div className="">
          <p className="">{type}</p>
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
      const { id } = row.original;
      return (
        <DeleteCell
          row={row}
          rowId={Number(id)}
          url={`consultant-projects`}
          query="get all consultants by project code"
        />
      );
    },
  },
];
