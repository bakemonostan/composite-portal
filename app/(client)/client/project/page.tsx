"use client";
import { columns } from "@/app/(admin)/project/columns";
import { data } from "@/app/(admin)/project/data";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";


export default function ClientProjectPage() {
  const onOpen = useAddProjectModal(state => state.onOpen)
  return (
    <>
      <PageHead headText="Project" subText="View all your projects here"/>
      <DataTable columns={columns} data={data} />
    </>
  )
}
