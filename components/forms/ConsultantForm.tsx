"use client";

import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "../shared/FormComponent";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddConsultantSchema, AddConsultantType } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/config/api";

export default function ConsultantForm({ isEdit }: { isEdit?: boolean }) {
  const form = useForm<AddConsultantType>({
    resolver: zodResolver(AddConsultantSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      type: "",
      website: "",
    },
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["add consultant"],
    mutationFn: async (data: { [Key in keyof AddConsultantType]: string }) => {
      try {
        const response = await api.post("/consultants", data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const onSubmit = (data: AddConsultantType) => {
    mutate(data);
  };
  return (
    <FormContainer
      title={isEdit ? "Edit Consultant" : "Add New Consultant"}
      description=""
      isColumn={true}
      className="w-full lg:max-w-3xl px-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-5 flex-col justify-center lg:items-center lg:flex-row">
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormField
                name="name"
                placeholder="Enter full name"
                control={form.control}
                label="Full name"
              />
              <CustomFormField
                control={form.control}
                name="contact"
                placeholder="Enter phone number"
                label="contact"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormSelect
                name="type"
                items={["Type 1", "Type 2"]}
                placeholder="select"
                control={form.control}
                labelText="Type"
              />
              <CustomFormField
                name="email"
                placeholder="Enter email"
                control={form.control}
                label="Email"
              />
            </div>
          </div>
          <CustomFormField
            name="website"
            placeholder="Enter website"
            control={form.control}
            label="Website"
          />
          <div className="flex flex-col md:flex-row gap-8 pt-8">
            <Button variant={"secondary"} className="w-full">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
