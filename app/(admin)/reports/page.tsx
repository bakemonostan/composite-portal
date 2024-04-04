"use client";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
// import { data } from "./data";
import PageHead from "@/components/ui/pageHead";
import { useRouter } from "next/navigation";
import { HiHome, HiOutlineClock, HiPlus } from "react-icons/hi2";
import useFetchReportData from "@/mutations/ReportMutation";
import { useEffect, useState } from "react";
import useGetAllReport from "@/store/report/ReportStore";

export default function ReportPage() {
  const router = useRouter();
  const { response, isError, isSuccess, error } = useFetchReportData();

  const { reportData } = useGetAllReport();


  useEffect(() => {
    response();
  }, [])

  const [data, setData] = useState<any[]>([]);

  useEffect(()=> {
    setData(reportData)
    console.log(reportData);
  }, [reportData])

  return (
    <div>
      <PageHead headText="Report" subText="A report of daily, weekly and monthly activities" buttonText="Add Report" buttonAction={() => router.push("/reports/new")} />

      <div className="flex gap-3 my-5">
        <div className='bg-[#007BFF08] text-sm rounded-md flex items-center p-3 gap-1'>
          <HiPlus className='text-primaryLight' />
          <p>All Report</p>
          <p className='text-white px-3 text-[12px] flex items-center justify-center rounded-full bg-primaryLight'>10</p>
        </div>

        <div className='bg-[#E7F6EC] text-sm rounded-md flex items-center p-3 gap-1'>
          <HiOutlineClock className='text-[#036B26]' />
          <p className='text-[#036B26]'>Daily Report</p>
          <p className='text-white px-3 text-[12px] flex items-center justify-center rounded-full bg-[#036B26]'>10</p>
        </div>

        <div className='bg-[#FEF6E7] text-sm rounded-md flex items-center p-3 gap-1'>
          <HiHome className='text-[#865503]' />
          <p className='text-[#865503]'>Daily Report</p>
          <p className='text-white px-3 text-[12px] flex items-center justify-center rounded-full bg-[#865503]'>10</p>
        </div>

        <div className='bg-[#FFECE5] text-sm rounded-md flex items-center p-3 gap-1'>
          <HiHome className='text-[#8A0000]' />
          <p className='text-[#8A0000]'>Daily Report</p>
          <p className='text-white px-3 text-[12px] flex items-center justify-center rounded-full bg-[#8A0000]'>10</p>
        </div>
      </div>

      {
        data?.length > 0 &&
        <DataTable columns={columns} data={data} />
      }
    </div>
  );
}
