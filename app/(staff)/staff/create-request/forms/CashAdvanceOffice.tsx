import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { useGetStaffDetails, useProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export const createCashAdvanceOfficeSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  cash_advance_purpose: z.string({
    required_error: "Purpose is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function CashAdvanceOffice() {
  const { projectsData } = useProjectData();
  const { toast } = useToast();
  const router = useRouter();
  const { userId } = userStore();
  const { staffDetails, isLoading } = useGetStaffDetails(userId);
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { formType, setFormType } = useStaffStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceOffice,
    },
  });

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        amount: Number(data.amount),
        project_code: projectsData?.find(
          (item: any) => item.project_name === data.project_name
        )?.project_code,
      });
      if (res.status === 201) {
        toast({
          title: "Request created successfully",
          variant: "success",
        });
        form.reset();
        router.push("/staff/requests");
      }
    } catch (error) {
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleSubmit,
  });

  const onSubmit = (data: CreateCashAdvanceOfficeType) => {
    mutate(data);
  };

  return (
    <FormContainer
      title="New Request"
      description=""
      isColumn={true}
      className="w-full max-w-[50rem]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <select
            id="request_type"
            {...form.register("request_type")}
            defaultValue="Cash Advance Office"
            onChange={(e: any) => setFormType(e.target.value)}
          >
            <option value="Material">Material</option>
            <option value="Labour">Labour</option>
            <option value="Cash Advance Project">Cash Advance - Project</option>
            <option value="Cash Advance Office">Cash Advance - Office</option>
            <option value="Tools and Machine Buy">
              Tools and Machines - Buy
            </option>
            <option value="Tools and Machine Rent">
              Tools and Machines - Rent
            </option>
            <option value="Tools and Machine Store">
              Tools and Machines - Store
            </option>
          </select>
          <div className="py-4 w-full">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="w-full">
                <CustomFormSelect
                  name="project_name"
                  labelText="Project Name"
                  control={form.control}
                  placeholder="Select Project"
                  items={projectName || []}
                />
              </div>
              <div className="w-full">
                <CustomFormField
                  name="amount"
                  label="Amount"
                  control={form.control}
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            <div className="flex flex-col py-3 gap-4 w-full">
              <CustomFormField
                name="cash_advance_purpose"
                label="Purpose"
                control={form.control}
                placeholder="Enter Purpose"
              />
              <CustomFormTextareaField
                name="description"
                label="Description"
                control={form.control}
                placeholder="Enter Description"
              />
              <CustomFormTextareaField
                name="comment"
                label="Comment"
                control={form.control}
                placeholder="Enter Comment"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
