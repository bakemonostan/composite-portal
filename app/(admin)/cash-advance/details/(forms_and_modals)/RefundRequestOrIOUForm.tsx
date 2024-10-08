import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import Link from "next/link";
import { userStore } from "@/store/auth/AuthStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const RefundRequestOrIOUSchema = z.object({
  cash_advance_type: z.string().optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .refine(
      (val) => {
        return val.length > 0;
      },
      {
        message: "Description is required",
      }
    ),
  amount_recorded: z
    .string({
      required_error: "Amount is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number")
    .refine(
      (val) => {
        return val.length > 0;
      },
      {
        message: "Amount is required",
      }
    ),
  decision: z.string().optional(),
  decision_reason: z.string().optional(),
  staff_name: z.string().optional(),
});

type RefundRequestOrIOUFormType = z.infer<typeof RefundRequestOrIOUSchema>;

export default function RefundRequestOrIOUForm() {
  const { CashAdvanceDetails, onClose } = useCashAdvanceStore();
  const { username } = userStore();
  const query = useQueryClient();
  const amountRequested = () => {
    return (
      Number(CashAdvanceDetails?.amount_collected) -
      Number(CashAdvanceDetails?.unused_cash)
    );
  };

  const form = useForm<RefundRequestOrIOUFormType>({
    resolver: zodResolver(RefundRequestOrIOUSchema),
    values: {
      cash_advance_type: CashAdvanceDetails?.cash_advance_type,
      description: CashAdvanceDetails?.description || " ",
      amount_recorded: CashAdvanceDetails?.unused_cash || " ",
      staff_name: CashAdvanceDetails?.staff_name,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["request iou", CashAdvanceDetails?.cash_id],
    mutationFn: async (data: RefundRequestOrIOUFormType) => {
      try {
        if (data.decision === "Approved") {
          const response = await api.put(
            `/cash-advances/${CashAdvanceDetails?.cash_id}`,
            {
              ...data,
              amount_recorded: Number(data.amount_recorded),
              action_by: username,
            }
          );

          //     }
          // if (response.status === 200) {
          //   toast({
          //     title: "Success",
          //     description: "Cash Advance complete",
          //     variant: "success",
          //   });
          //   onClose();
          //   router.push(
          //     `/cash-advance/${CashAdvanceDetails?.cash_id}/approved-details`
          //   );
          // }
        }

        if (data.decision === "Declined") {
          const response = await api.put(
            `/cash-advances/${CashAdvanceDetails?.cash_id}`,
            {
              decision_reason: data.decision_reason,
              action_by: username,
            }
          );
        }
        // return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const submit = (data: RefundRequestOrIOUFormType) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        query.invalidateQueries({
          queryKey: ["get cash advance"],
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
        <div className="grid md:grid-cols-2 gap-5 pb-3">
          <CustomFormField
            name="type"
            control={form.control}
            label="Type"
            disabled
            placeholder={CashAdvanceDetails?.cash_advance_type}
          />
          <CustomFormField
            name="staff_name"
            control={form.control}
            label="Requested by"
            disabled
            placeholder={CashAdvanceDetails?.staff_name}
          />
          <CustomFormField
            name="amount_recorded"
            control={form.control}
            label={"Returned Amount"}
            placeholder={CashAdvanceDetails?.balance}
            disabled
          />
          <CustomFormSelect
            name="decision"
            control={form.control}
            labelText={"Decision"}
            items={["Approved", "Rejected"]}
          />
        </div>

        <CustomFormTextareaField
          name="decision_reason"
          control={form.control}
          label={"Decision Reason"}
        />
        <CustomFormTextareaField
          name="description"
          control={form.control}
          label={"Description"}
        />
        <div className="grid md:grid-cols-2 gap-5 pt-6">
          <Button variant={"secondary"} type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
