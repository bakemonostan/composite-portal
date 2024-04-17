import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getAllFlats, getAllTenants, getTenantDetails } from "@/utils/actions";
import { ITenantDetails } from "@/utils/types";

export const useTenants = () => {
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["get all tenants"],
    queryFn: getAllTenants,
  });

  return { data, isPending, isSuccess, isError, error };
};

export const useFlats = () => {
  const { data } = useQuery({
    queryKey: ["get all flats"],
    queryFn: getAllFlats,
  });

  return { flats: data };
};

export const useProjectData = () => {
  const { data } = useQuery({
    queryKey: ["get all projects"],
    queryFn: async () => {
      try {
        const response = await api.get("/projects");
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  return { projectsData: data };
};

export const useTenantDetails = (id: number) => {
  const { data } = useQuery({
    queryKey: ["get tenant details", id],
    queryFn: () => getTenantDetails(id),
  });
  return { tenantDetails: data };
};

export const useStaffRoles = () => {
  const { data } = useQuery({
    queryKey: ["get roles"],
    queryFn: getRoles,
  });
  return { staffRoles: data };
};

export const getRoles = async () => {
  try {
    const response = await api.get("/staffs/roles/all");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

const getStuff = async (args: string) => {
  try {
    const response = await api.get(`${args}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const useGetStakeHolders = () => {
  const { data } = useQuery({
    queryKey: ["get all stakeholders"],
    queryFn: () => getStuff("/stakeholder"),
  });

  return { stakeholders: data };
};

export const useGetContractor = () => {
  const { data } = useQuery({
    queryKey: ["get all contractors"],
    queryFn: () => getStuff("/contractors"),
  });

  return { contractors: data };
};

// export const useGetMaterials = () => {
//   const { data } = useQuery({
//     queryKey: ["get all materials"],
//     queryFn: () => getStuff("/materials"),
//   });
//   return { materials: data };
// };