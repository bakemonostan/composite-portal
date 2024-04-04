"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type SupplierType = {
  id: string;
  supplierName: string;
  address: string;
  officePhone: string;
  contactPerson: string;
  contactPhone: string;
  addedOn: string;
  actions: any;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "supplierName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Supplier Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/suppliers/${row.original["id"]}`}>
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <span className="font-semibold">{row.original["supplier_name"]}</span>
          </div>
        </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["supplier_address"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "officePhone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["supplier_ofc_phone"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Person" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.original["contact_person"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">{row.original["contact_mobile"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "addedOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original["createdAt"]}</p>
          
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
        <Link href={`/suppliers/${row.original["id"]}/edit`}>
        <div className="">
          <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
        </Link>
      );
    },
  },
];
