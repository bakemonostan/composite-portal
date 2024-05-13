"use client";
import { DetailsModal } from "@/components/Modals/inventory/DetailsModal";
import SuccesModal from "@/components/Modals/SuccesModal";

import AddAndEditBreakdownModal from "@/components/Modals/cash-advance/AddAndEditBreakdownModal";
import ProjectSuccessModal from "@/components/Modals/projects/ProjectSuccessModal";
import AddCommentModal from "@/components/Modals/requests/AddCommentModal";
import UpdateRequestModal from "@/components/Modals/requests/UpdateRequestModal";
import { useEffect, useState } from "react";
import AddProjectModal from "@/components/Modals/projects/AddProjectModal";
import AddContractorModal from "@/components/Modals/projects/AddContractorModal";
import AddMaterial from "@/components/Modals/projects/AddMaterialModel";
import AddStakeHolderModal from "@/components/Modals/projects/AddStakeholderModel";
import AddStartUp from "@/components/Modals/projects/AddStartUpModal";
import UpdateProjectModal from "@/components/Modals/projects/UpdateProject";
import AddWorkerModal from "@/components/Modals/projects/AddWorkerModal";
import EditFlatModal from "@/components/Modals/faclility/EditFlatModal";
import ProjectDetailsPageFormModal from "@/components/Project/ProjectDetailsPageFormModal";
import AddToProjectModal from "@/components/Modals/AddToProjectModal";
import RequestApprovalModal from "@/app/(admin)/requests/request-details/[id]/forms/RequestApprovalModal";
import AdvancesModals from "@/app/(admin)/cash-advance/details/(forms_and_modals)/AdvancesModals";
import { AddAndEditApartmentModal } from "@/components/Modals/AddAndEditApartmentModal";
import ClientModal from "@/app/(client)/client/project/ClientModal";

export const ModalProvider = () => {
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!ismounted) {
    return null;
  }

  return (
    <>
      <AddAndEditApartmentModal />
      <ClientModal />
      <EditFlatModal />
      <AddCommentModal />
      <UpdateRequestModal />
      <DetailsModal />
      <AddAndEditBreakdownModal />
      <ProjectSuccessModal />
      <AddProjectModal />
      <SuccesModal />
      <AddContractorModal />
      <AddMaterial />
      <AddStakeHolderModal />
      <AddStartUp />
      <UpdateProjectModal />
      <AddWorkerModal />
      <ProjectDetailsPageFormModal />
      <AddToProjectModal />
      <RequestApprovalModal />
      <AdvancesModals />
    </>
  );
};
