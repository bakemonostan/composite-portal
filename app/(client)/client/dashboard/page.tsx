"use client";

import { ICommentData } from "@/app/(admin)/manage-client/client-details/[id]/commentCol";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import {
  useGetAllClientComments,
  useGetClientDetails,
  useGetClientFlats,
  useGetClientProjectData,
} from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useClientStore from "@/store/client/useClientStore";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function ClientHomePage() {
  const { projectDetails } = useClientStore();
  const { clientFlats } = useGetClientFlats(projectDetails?.project_code);
  const { clientComments } = useGetAllClientComments();
  const { userId, username } = userStore();
  const filteredComment = clientComments?.filter(
    (item: ICommentData) => String(item?.client_id) === userId
  );
  const idString = userId !== null ? userId.toString() : "";

  const { ClientProjectDetails, isClientProjectLoading } =
    useGetClientProjectData(idString);

  const { details, isClientDetailsLoading } = useGetClientDetails(userId!);
  return (
    <div className="lg:pr-24">
      <div>
        <aside className="bg-white flex-col md:flex-row flex justify-between items-center border-borderColor border p-6 gap-5 rounded-xl ">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-responsive font-semibold capitalize">
              Welcome, {username}
            </h2>
            <span className="text-textColor text-sm text-wrap max-w-xs">
              {details?.address}
            </span>
            <Link
              href="/client/profile"
              className="flex justify-between items-center text-sm font-semibold text-primaryLight w-32">
              <span>View Profile</span>
              <span>
                <ChevronRight />
              </span>
            </Link>
          </div>
          <div>
            <AvatarComponent
              height="h-28"
              width="w-28"
            />
          </div>
        </aside>
      </div>
      <div>
        <div className="pb-12 flex gap-10 py-3 pt-5  md:overflow-x-visible overflow-x-auto hide">
          <Card
            details="View and manage all the information regarding your projects"
            title="Projects"
            total={String(ClientProjectDetails?.length || 0)}
            href="/client/projects"
          />
          <Card
            details="View and manage all your comments for your projects"
            title="Comments"
            total={String(filteredComment?.length || 0)}
            href="/client/comments"
          />
          <Card
            details="View and manage all the information regarding your flats"
            title="Flat"
            total={String(clientFlats?.length || 0)}
            href="/client/project"
          />
        </div>
      </div>
    </div>
  );
}

interface Props {
  title: string;
  total: string;
  details: string;
  href?: string;
}

const Card = ({ title, details, href, total }: Props) => {
  return (
    <div className="flex-col gap-6 space-y-3 border-borderColor border rounded-xl shadow-lg p-6 w-full min-w-[250px] sm:min-w-0 bg-white">
      <div className="flex justify-between items-center">
        <span>
          <HomeIcon />
        </span>
        <span className="text-primaryLight font-semibold">{total}</span>
      </div>
      <div className="space-y-2 pb-5">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-textColor text-sm text-wrap">{details}</p>
      </div>
      <Link href={href ?? ""} className=" text-sm text-white font-semibold">
        <Button className="rounded-xl">View</Button>
      </Link>
    </div>
  );
};
