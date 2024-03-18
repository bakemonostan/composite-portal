"use client";

import { useTestModalStore } from "@/hooks/UseTestModal";
import { Modal } from "../shared/Modal";

export const TestModal = () => {
  const testModal = useTestModalStore();
  return (
    <Modal
      title="Test Modal 🙂"
      description="I am a test modal"
      isOpen={true}
      onClose={testModal.onClose}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, pariatur.
      </p>
    </Modal>
  );
};
