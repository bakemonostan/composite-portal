"use client";
import z from "zod";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { Modal } from "@/components/shared/Modal";

export default function RequestApprovalModal() {
  const { isOpen, onClose, formType } = useUpdateRequestStore();
  const { formDetails } = useUpdateRequestStore();

  return (
    <Modal
      title={`Approve Request - ${formDetails?.request_type}`}
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-3xl"
    >
      {formType === "Material" && <Material />}
      {formType === "Labour" && <Labour />}
      {formType === "Cash Advance Project" && <CashAdvance />}
      {formType === "Cash Advance Office" && <CashAdvanceOffice />}
      {formType === "Tools and Machine Buy" && <ToolsAndMachineBuy />}
      {formType === "Tools and Machine Rent" && <ToolsAndMachineRent />}
      {formType === "Tools and Machine Store" && <ToolAndMachineStore />}
    </Modal>
  );
}


