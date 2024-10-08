import {
  useGetContractorProject,
  useGetStakeholderProject,
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
import { IStakeholderProjectData } from "@/utils/types";

const EditStakeholderSchema = z.object({
  added_comment: z.string().optional(),
  approved_amount: z.string({
    required_error: "Add an approved amount",
  }),
  comment: z.string().optional(),
  status: z.string({
    required_error: "Please select a status",
  }),
});

type IEditStakeholderForm = z.infer<typeof EditStakeholderSchema>;

export default function ApproveStakeholderForm({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const { projectDetails } = useGetStakeholderProject(id);
  const form = useForm<IEditStakeholderForm>({
    resolver: zodResolver(EditStakeholderSchema),
  });

  const { mutate, error } = useMutation({
    mutationKey: ["edit stakeholder form", id],
    mutationFn: async (data: IEditStakeholderForm) => {
      try {
        const response = await api.put<IStakeholderProjectData>(
          `/stakeholder-project/${id}`,
          data
        );
        if (data.status === "DECLINED") {
          toast({
            title: "Stakeholder Declined",
            variant: "destructive",
          });
        } else if (response.status === 200 && data.status === "APPROVED") {
          toast({
            title: "Stakeholder approved successfully",
            variant: "success",
          });
        }
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
      router.push("/stakeholders/pending-project");
    },
    onError: (error: Error) => {
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: IEditStakeholderForm) => {
    mutate(data);
  };
  return (
    <div>
      <GoBack />
      <FormContainer isColumn title="Pending Stakeholder Form">
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
              name="stakeholder_name"
              placeholder={projectDetails?.stakeholder_name}
              disabled
              className="placeholder:uppercase"
              label="Stakeholder Name/Code"
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
                name="stakeholder_amount"
                placeholder={projectDetails?.stakeholder_amount}
                disabled
                className="placeholder:uppercase"
                label="Official Amount"
              />
              <CustomFormField
                control={form.control}
                name="other_amount"
                label="Other amount"
                disabled
                placeholder={projectDetails?.other_amount}
                className="placeholder:uppercase"
              />
              <CustomFormField
                control={form.control}
                name="approved_amount"
                label="Approved amount"
                placeholder="Add approved amount"
              />
              <CustomFormSelect
                name="status"
                control={form.control}
                items={["APPROVED", "DECLINED"]}
                placeholder="Status"
                labelText="Status"
              />
            </div>

            <CustomFormTextareaField
              name="comment"
              control={form.control}
              placeholder="Enter comment"
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
              <Button type="submit">
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </FormContainer>
    </div>
  );
}
