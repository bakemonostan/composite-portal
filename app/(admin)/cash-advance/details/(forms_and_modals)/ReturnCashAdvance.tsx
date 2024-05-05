import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function ReturnCashAdvance() {
  const form = useForm({});
  return (
    <Form {...form}>
      <form className="space-y-3">
        <CustomFormField name="type" control={form.control} label="Type" />
        <CustomFormField
          name="approved_amounnt"
          control={form.control}
          label={"Approved Amount"}
        />
        <CustomFormField
          name="unused_cash_amount"
          control={form.control}
          label={"Unused Cash Amount"}
        />
        <CustomFormTextareaField
          name="Description"
          control={form.control}
          label={"Description"}
        />
        <div className="grid md:grid-cols-2 gap-5">
          <Button variant={"secondary"}>Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
