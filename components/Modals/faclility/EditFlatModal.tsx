import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { useEditFlatModal } from "@/store/modals/useCreateModal";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useProjectData } from "@/hooks/useSelectOptions";
import useFacilityStore from "@/store/facility/useFacilityStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Form } from "@/components/ui/form";
import { useTableActionStore } from "@/store/useTableActionStore";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  flat_desc: z.string({
    required_error: "Flat Description is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function EditFlatModal() {
  const { action, projectCode } = useEditFlatModal();
  const { onClose } = useTableActionStore();
  const { toast } = useToast();
  const { projectsData } = useProjectData();
  const { flatData } = useFacilityStore();
  const flatItem = flatData?.find(
    (item: any) => item.project_name === projectCode
  );
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    values: {
      flat_desc: flatItem?.flat_desc || "",
      comment: flatItem?.comment || "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["apartment"],
    mutationFn: async (data: FormSchemaType) => {
      const response = await api.put(`/project-flats/${flatItem?.flat_id}`, {
        ...data,
      });
      return response.data;
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        toast({
          title: "Flat updated successfully",
          variant: "success",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          control={form.control}
          name="project_name"
          placeholder={flatItem?.project_name}
          label="Project Name"
          disabled
        />
        <CustomFormField
          control={form.control}
          name="flat_desc"
          label="Flat Description"
          placeholder={flatItem?.flat_desc}
        />
        <CustomFormTextareaField
          control={form.control}
          name="comment"
          label="Comment"
          placeholder={flatItem?.comment}
        />

        <div className="grid grid-cols-2 gap-5 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            type="button">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

