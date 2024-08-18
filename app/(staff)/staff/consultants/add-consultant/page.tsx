"use client";
import ConsultantForm from "@/components/forms/ConsultantForm";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";
import GoBack from "@/components/shared/GoBack";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function AddConsultantPage() {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "contractor"
  )?.can_create;

  if (!CAN_CREATE) {
    return <BlockEdiComponent />;
  }
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div>
        <ConsultantForm />
      </div>
    </div>
  );
}
