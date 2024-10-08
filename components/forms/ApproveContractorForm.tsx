import {
  useGetAllProjectData,
  useGetContractorProject,
} from "@/hooks/useSelectOptions";
import GoBack from "../shared/GoBack";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "../shared/FormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const EditContractorSchema = z.object({
  added_comment: z.string().optional(),
  approved_amount: z.string({
    required_error: "Add an approved amount",
  }),
  comment: z.string().optional(),
  status: z.string({
    required_error: "Please select a status",
  }),
});

type IEditContractorForm = z.infer<typeof EditContractorSchema>;

export default function ApproveContractorForm({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const { projectDetails } = useGetContractorProject(id);
  const { projects } = useGetAllProjectData();
  const projectId = projects?.find(
    (project) =>
      project?.project_code === projectDetails?.contractor_project_code
  )?.id;
  const form = useForm<IEditContractorForm>({
    resolver: zodResolver(EditContractorSchema),
  });

  const { mutate, error } = useMutation({
    mutationKey: ["editContractorForm", id],
    mutationFn: async (data: IEditContractorForm) => {
      try {
        const response = await api.put(`/contractor-projects/${id}`, data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Contractor approved successfully",
        variant: "success",
      });
      router.push("/contractors/pending-project");

    },
    onError: (error: Error) => {
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: IEditContractorForm) => {
    mutate(data);
  };
  return (
    <div>
      <GoBack />
      <FormContainer isColumn title="Pending Contractor Project">
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField
              control={form.control}
              name="project_name"
              placeholder={projectDetails?.project_name}
              disabled
              className="placeholder:uppercase"
              label="Project Name"
            />
            <CustomFormField
              control={form.control}
              name="contractor_name"
              placeholder={projectDetails?.contractor_name}
              disabled
              className="placeholder:uppercase"
              label="Contractor Name"
            />
            <CustomFormTextareaField
              className="disabled:cursor-not-allowed disabled:bg-gray-200 placeholder:uppercase placeholder:text-gray-500 placeholder:font-semibold"
              name="added_comment"
              control={form.control}
              placeholder={projectDetails?.comment}
              label="Added Comment"
              disabled
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomFormField
                control={form.control}
                name="contractor_amount"
                placeholder={projectDetails?.contractor_amount}
                disabled
                className="placeholder:uppercase"
                label="Official amount"
              />{" "}
              <CustomFormField
                control={form.control}
                name="approved_amount"
                label="Approved amount"
              />
            </div>
            <CustomFormSelect
              name="status"
              control={form.control}
              items={["Pending", "Approved", "Declined"] as const}
              placeholder="Status"
              labelText="Status"
            />

            <CustomFormTextareaField
              name="comment"
              control={form.control}
              placeholder={"Add a comment"}
              label="Comment"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Button
                onClick={() => router.back()}
                variant="secondary"
                type="button"
              >
                Cancel
              </Button>
              <Button>Submit</Button>
            </div>
          </form>
        </Form>
      </FormContainer>
    </div>
  );
}
