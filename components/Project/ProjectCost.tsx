import React from 'react'
import DashboardCard from '../Dashboard/DashboardCard'
import { TotalProjectsIcon } from "../icons";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import SpinnerComponent from "../shared/SpinnerComponent";

interface CardDataDetails {
  project_code: string;
  startup_cost: string;
  stakeholder_amount: string;
  contractor_amount: string;
  material_amount: string;
  machinery_approved_amount: string;
  labour_approved_amount: string;
  cash_advance_approved_amount: string;
}

const ProjectCost = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all project team members by project code", projectCode],
    queryFn: async () =>
      getStuffTyped<CardDataDetails[]>(`/projects/summary/${projectCode}`),
    refetchOnMount: "always",
    enabled: !!projectCode,
  });

  if (isPending) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-10 mt-2 rounded-lg">
        <SpinnerComponent />
      </div>
    );
  }

  if (data && data.length > 0) {
    const cardData = Object.entries(data[0])
      .filter(([key]) => key !== "project_code")
      .map(([title, description]) => ({
        title: title.replace(/_/g, " "),
        description,
        icon: <TotalProjectsIcon />,
        withIcon: true,
      }));

    const totalAmount =
      data && data.length > 0
        ? parseFloat(data[0].startup_cost ?? 0) +
          parseFloat(data[0].stakeholder_amount ?? 0) +
          parseFloat(data[0].contractor_amount ?? 0) +
          parseFloat(data[0].material_amount ?? 0) +
          parseFloat(data[0].machinery_approved_amount ?? 0) +
          parseFloat(data[0].labour_approved_amount ?? 0) +
          parseFloat(data[0].cash_advance_approved_amount ?? 0)
        : 0;

    return (
      <div className="py-3">
        <h2 className="text-[20px] font-[600] py-5">Project Cost</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-10 mt-2 rounded-lg">
          <DashboardCard
            title="Total Amount"
            description={formatCurrency(totalAmount)}
            icon={<TotalProjectsIcon />}
            withIcon={true}
          />
          {cardData?.map((item: any, i: number) => {
            return (
              <DashboardCard
                key={i}
                description={formatCurrency(item.description)}
                title={item.title}
                icon={item.icon}
                withIcon={item.withIcon}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="py-3">
        <h2 className="text-[20px] font-[600] py-5">Project Cost</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-10 mt-2 rounded-lg">
          <DashboardCard
            title="Total Amount"
            description={formatCurrency(0)}
            icon={<TotalProjectsIcon />}
            withIcon={true}
          />
          {dummyData?.map((item: any, i: number) => {
            return (
              <DashboardCard
                key={i}
                description={formatCurrency(item.description)}
                title={item.title}
                icon={item.icon}
                withIcon={item.withIcon}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default ProjectCost;

const dummyData = [
  {
    description: "0",
    title: "startup cost",
    icon: "",
    withIcon: "",
  },

  {
    description: "0",
    title: "STAKEHOLDER AMOUNT",
    icon: "",
    withIcon: "",
  },
  {
    description: "0",
    title: "CONTRACTOR AMOUNT",
    icon: "",
    withIcon: "",
  },
  {
    description: "0",
    title: "MATERIAL AMOUNT",
    icon: "",
    withIcon: "",
  },
  {
    description: "0",
    title: "MACHINERY APPROVED AMOUNT",
    icon: "",
    withIcon: "",
  },
  {
    description: "0",
    title: "LABOUR APPROVED AMOUNT",
    icon: "",
    withIcon: "",
  },
  {
    description: "0",
    title: "CASH ADVANCE APPROVED AMOUNT",
    icon: "",
    withIcon: "",
  },
];