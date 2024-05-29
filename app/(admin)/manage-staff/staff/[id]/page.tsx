"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { api } from "@/config/api";
import useManageStaffStore from "@/store/manage-staff/useManageStaffStore";
import { formatDate } from "@/utils/formatDate";
import { ApiResponse, IManageStaffData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  params: { id: string };
}

const staffDetailsKeys = [
  "Staff Code",
  "Employee Status",
  "Email",
  "Cell Number",
  "Gender",
  "Address",
  "State of Origin",
  "Next of Kin",
  "Address (Next of Kin)",
  "Phone Number (Next of Kin)",
  "Grade",
  "Date employed",
  "Type",
  "Mobile",
  "Date of birth",
  "Marital status",
  "Marital Status of Next of Kin",
  "LGA",
  "Relationship",
  "Email of Next of Kin",
  "Department",
  "Branch",
];

const staffDetailsValues = [
  "userid",
  "employee_status",
  "email",
  "cell_phone",
  "sex",
  "address",
  "stateOfOrigin",
  "nextOfKin",
  "addressOfNOK",
  "phoneOfNOK",
  "gradeid",
  "date_employed",
  "staff_type",
  "home_phone",
  "dob",
  "marital_status",
  "marital_status",
  "lga",
  "relationship",
  "emailOfNOK",
  "deptid",
  "branchcode",
];

const bankDetailsKeys = ["Bank name", "Account name", "Account number"];
const bankDetailsValues = ["bank_name", "account_name", "account_number"];

export default function ManageStaffPage({ params }: IProps) {
  const { setStaffDetails, staffDetails } = useManageStaffStore();
  const [toggle, setToggle] = useState(false);
  const showBankDetails = () => setToggle(!toggle);
  const { data, error, isPending } = useQuery({
    queryKey: ["get staff details"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IManageStaffData>>(
          `/staffs/${params.id}`
        );
        setStaffDetails(response.data.data);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    refetchOnMount: "always",
  });

  return (
    <>
      <GoBack />
      <div className="bg-white border-borderColor rounded-lg max-w-4xl mx-auto p-6">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <aside className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-responsive font-semibold">
                  {staffDetails?.firstname} {staffDetails?.middlename}{" "}
                  {staffDetails?.lastname}
                </span>
                <span className="text-xs ">
                  Added on{" "}
                  {staffDetails?.createdAt &&
                    formatDate(staffDetails?.createdAt)}
                </span>
              </div>
            </aside>
            <aside>
              <Button>
                <Link href={`/manage-staff/edit/${params.id}`}>Edit</Link>
              </Button>
            </aside>
          </div>
          <div className="mt-10">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 ">
              {staffDetailsKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex justify-between  flex-col gap-2"
                >
                  <span className="font-semibold">{key}:</span>
                  <span
                    className={`text-textColor ${
                      staffDetailsValues[index] === "userid" ? "uppercase" : ""
                    }`}
                  >
                    {
                      staffDetails?.[
                        staffDetailsValues[index] as keyof IManageStaffData
                      ]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex justify-end mt-5">
          <Button onClick={showBankDetails}>
            {toggle ? "Hide" : "View"} Bank Details
          </Button>
        </div>
        {toggle && (
          <div>
            <div className="py-3">
              <h2>Bank Details</h2>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-10 text-sm ">
                {bankDetailsKeys.map((key, index) => (
                  <span key={index}>{key}:</span>
                ))}
              </div>
              <div className="flex flex-col text-sm font-semibold gap-10 ">
                {bankDetailsValues.map((value, index) => (
                  <span key={index}>
                    {staffDetails?.[value as keyof IManageStaffData]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}