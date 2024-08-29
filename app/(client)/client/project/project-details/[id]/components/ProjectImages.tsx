import { getStuffTyped } from "@/hooks/useSelectOptions";
import useClientStore from "@/store/client/useClientStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface ProjectImage {
  id: number;
  client_id: string;
  image: string;
  project_id: string;
  project_code: string;
  createdAt: string;
  updatedAt: string;
  added_by: string;
}

export default function ProjectImages() {
  const { projectDetails } = useClientStore();

  const { data } = useQuery({
    queryKey: ["Get Project Images", projectDetails?.id],
    queryFn: () =>
      getStuffTyped<ProjectImage[]>(`/client/images/${projectDetails?.id}`),
    enabled: !!projectDetails?.id,
    refetchOnMount: "always",
  });
  return (
    <div className="p-4 bg-white -Color shadow-lg rounded-lg mt-5 py-10">
      <h2 className="font-semibold md:text-lg">Project Images</h2>

      <div>
        {data?.length === 0 ? (
          <p>No images found</p>
        ) : (
          <div className="flex gap-5 flex-wrap">
            {data?.map((item) => {
              return (
                <div key={item.id}>
                  <Image
                    width={120}
                    height={120}
                    className="aspect-square"
                    src={item.image}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
