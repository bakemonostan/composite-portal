"use client"
import { Modal } from '@/components/shared/Modal'
import { useUpdateProjectModal } from '@/store/inventory/UseInventoryModal';
import React from 'react'
import { HiHome } from 'react-icons/hi2';

const UpdateProjectModal = () => {
    const isOpen = useUpdateProjectModal((state) => state.isOpen);
    const onClose = useUpdateProjectModal((state) => state.onClose);

    return (
      <Modal
        title={
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex gap-2 items-center">
              <div className="p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center">
                <HiHome />
              </div>
              <p className="text-[22px] font-[600] text-[#101928]">
                Add Project
              </p>
            </div>
          </div>
        }
        description={""}
        isOpen={isOpen}
        onClose={onClose}
        classname=" rounded-lg border border-outline bg-white p-[20px] w-3/6 focus max-h-[90vh] overflow-auto"
      >
        <div>
          <div className="grid grid-cols-2 gap-2 my-5 edit">
            <div className="flex flex-col col-span-2">
              <p className="value">Project Name</p>

              <input type="text" placeholder="Enter name" />
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input type="text" placeholder="" />
            </div>

            <div className="flex flex-col">
              <p className="value">State</p>

              <input type="text" placeholder="" />
            </div>

            <div className="flex flex-col">
              <p className="value">City</p>

              <input type="text" />
            </div>

            <div className="flex flex-col">
              <p className="value">LGA</p>

              <input type="text" />
            </div>

            <div className="flex flex-col">
              <p className="value">Start Date</p>

              <input type="date" />
            </div>

            <div className="flex flex-col">
              <p className="value">End Date</p>

              <input type="date" />
            </div>

            <div className="flex flex-col">
              <p className="value">Duration</p>

              <input type="text" />
            </div>

            <div className="flex flex-col">
              <p className="value">Status</p>

              <select>
                <option value="Ongoing"></option>
              </select>
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Description</div>

              <textarea />
            </div>

            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primaryLight text-white  p-5 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    );
}

export default UpdateProjectModal