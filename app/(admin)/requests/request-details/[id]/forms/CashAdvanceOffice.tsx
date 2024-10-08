import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { useGetStaffDetails, useProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { useEffect } from "react";

export const createCashAdvanceOfficeSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  approved_amount: z.string({
    required_error: "Amount is required",
  }),
  payment_method: z.string({
    required_error: "Payment method is required",
  }),
  bank: z.string({
    required_error: "Bank name is required",
  }),
  supervisor_comment: z.string().optional(),
  account_number: z.string({
    required_error: "Account number is required",
  }),
  account_name: z.string({
    required_error: "Account name is required",
  }),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function CashAdvanceOffice() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const { staffDetails } = useGetStaffDetails(formDetails?.staff_id!);
  const { toast } = useToast();
  const { username } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceOffice,
      bank: staffDetails?.bank_name,
      account_number: staffDetails?.account_number,
      account_name: staffDetails?.account_name,
    },
  });

  const createCashAdvance = async (data: any) => {
    try {
      const res = await api.post("/cash-advances", {
        ...data,
        amount_collected: Number(data.approved_amount),
        amount_recorded: 0,
        balance: 0,
        project_code: formDetails?.project_code,
        project_name: formDetails?.project_name,
        cash_advance_type: "Cash Advance Office",
        request_code: formDetails?.request_code,
        bank_to: data.bank,
        payment_method: data.payment_method,
        status: "Approved",
        staff_name: formDetails?.staff_name,
        staff_id: formDetails?.staff_id,
      });

      if (res.status === 200 || res.status === 201) {
        window.location.reload();
      }
      return res.data.data;
    } catch (error) {}
  };

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "APPROVED",
        approved_by: username,
        approved_on: new Date(),
        approved_amount: Number(data.approved_amount),
        approved_total_amount: Number(data.approved_amount),
      });
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        onClose();
        createCashAdvance(data);
      }
    } catch (error) {
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (staffDetails) {
      form.setValue("bank", staffDetails?.bank_name);
      form.setValue("account_number", staffDetails?.account_number);
      form.setValue("account_name", staffDetails?.account_name);
    }
  }, [form, staffDetails]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <CustomFormSelect
            name="request_type"
            control={form.control}
            labelText="Request Type"
            disabled
            items={Object.values(RequestType)}
          />
          <CustomFormField
            name="request_from"
            control={form.control}
            label="Request From"
            disabled
            value={formDetails?.staff_name}
          />
        </div>
        <div className="space-y-3 py-3 w-full">
          <div className="w-full">
            <CustomFormField
              name="amount"
              label="Amount"
              control={form.control}
              placeholder={String(formDetails?.amount)}
              disabled
            />
          </div>
          <CustomFormField
            name="approved_amount"
            label="Approved Amount"
            control={form.control}
            placeholder="Enter Approved Amount"
            className="py-2"
          />
          <div className="grid md:grid-cols-2 gap-5 pb-3">
            <CustomFormSelect
              name="payment_method"
              control={form.control}
              labelText="Select Payment Method"
              items={["Online Transfer", "Pay to Bank", "Cash", "Cheque"]}
            />
            <CustomFormField
              name="bank"
              control={form.control}
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
            <CustomFormField
              name="account_name"
              control={form.control}
              label="Account Name"
              disabled
              placeholder={staffDetails?.account_name}
            />{" "}
            <CustomFormField
              name="account_number"
              control={form.control}
              label="Account number"
              disabled
              placeholder={staffDetails?.account_number}
            />
          </div>
          <CustomFormTextareaField
            name="supervisor_comment"
            control={form.control}
            label="Comment"
            placeholder="Enter a comment"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            Approve Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
