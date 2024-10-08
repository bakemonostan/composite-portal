import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import {
  useGetAllInventoryTypes,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export const ToolsAndMachineBuySchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project name is required",
  }),
  tool_name: z.string({
    required_error: "Tool type is required",
  }),
  company: z.string({
    required_error: "Company name is required",
  }),
  contact_mobile: z
    .string({
      required_error: "Contact number is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  company_address: z.string({
    required_error: "Company address is required",
  }),
  ofc_phone: z
    .string({
      required_error: "Office phone is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  contact_person: z.string({
    required_error: "Contact person is required",
  }),
  description: z.string({
    required_error: "Item description is required",
  }),
  quantity: z.coerce
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  unit_price: z.coerce
    .string({
      required_error: "Unit price is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),

  comment: z.string().optional(),
});

type ToolsAndMachineBuyType = z.infer<typeof ToolsAndMachineBuySchema>;

export default function ToolsAndMachineBuy() {
  const { projectsData } = useProjectData();
  const { formDetails, onClose } = useUpdateRequestStore();
  const router = useRouter();
  const { toast } = useToast();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { inventories } = useGetAllInventoryTypes();
  const toolType = inventories?.map((item: any) => item?.type);

  const form = useForm<ToolsAndMachineBuyType>({
    resolver: zodResolver(ToolsAndMachineBuySchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineryBuy,
      project_name: formDetails?.project_name,
      tool_name: formDetails?.tool_name,
      company: formDetails?.company,
      company_address: formDetails?.company_address,
      contact_mobile: formDetails?.contact_mobile,
      ofc_phone: formDetails?.ofc_phone,
      contact_person: formDetails?.contact_person,
      description: formDetails?.description,
      quantity: formDetails?.quantity as unknown as string,
      unit_price: formDetails?.unit_price as unknown as string,
      comment: formDetails?.comment,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineBuyType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "PENDING",
        total_price: Number(data.unit_price) * Number(data.quantity),
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
      });
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Request Edited",
          variant: "success",
        });
        form.reset();
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CustomFormSelect
          name="request_type"
          control={form.control}
          labelText="Request Type"
          disabled
          items={[RequestType.ToolsAndMachineryBuy]}
        />
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-center py-3">
            <div className="w-full flex flex-col gap-5">
              <CustomFormSelect
                name="project_name"
                control={form.control}
                labelText="Project"
                items={projectName || [" "]}
              />
              <CustomFormField
                name="company"
                control={form.control}
                label="Company"
                disabled
                placeholder="Enter Company"
              />
              <CustomFormField
                name="ofc_phone"
                disabled
                control={form.control}
                label="Company Phone"
                placeholder="Enter number"
              />
              <CustomFormField
                name="contact_mobile"
                disabled
                control={form.control}
                label="Contact Number"
                placeholder="Enter number"
              />
              <CustomFormField
                name="quantity"
                control={form.control}
                label="quantity"
                placeholder="Enter quantity"
              />
            </div>

            <div className="w-full flex flex-col gap-5">
              <CustomFormSelect
                name="tool_name"
                control={form.control}
                labelText="Tool Type"
                items={toolType || [" "]}
              />

              <CustomFormField
                name="company_address"
                control={form.control}
                disabled
                label="Company Address"
                placeholder="Enter Company Address"
              />
              <CustomFormField
                name="contact_person"
                control={form.control}
                label="Contact Person"
                disabled
                placeholder="Enter full name"
              />
              <CustomFormField
                name="description"
                control={form.control}
                label="Item Description"
                placeholder="Enter description"
              />
              <CustomFormField
                name="unit_price"
                control={form.control}
                label="Unit Price"
                placeholder="Enter Unit Price"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4">
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
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
