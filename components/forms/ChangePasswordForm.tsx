"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../shared/FormComponent";
import { Button } from "../ui/button";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const ChangePasswordSchema = z
  .object({
    current_password: z.string({
      required_error: "Please enter your current password",
    }),
    new_password: z.string({
      required_error: "Please enter a new password",
    }),
    confirm_new_password: z.string({
      required_error: "Please confirm your new password",
    }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords do not match",
    path: ["confirm_new_password"],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
export default function ChangePasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: ChangePasswordSchemaType) => {
      try {
        if (data.new_password === data.confirm_new_password) {
          const response = await api.put("/users/change-password", {
            oldPassword: data.current_password,
            newPassword: data.new_password,
          });
          return response.data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Password changed successfully",
        variant: "success",
      });
      // window.location.reload();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const submit = (data: ChangePasswordSchemaType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="flex flex-col w-full gap-5 pt-10 lg:pt-0 lg:pr-10">
          <CustomFormField
            type="password"
            name="current_password"
            control={form.control}
            placeholder="Enter current password"
          />

          <CustomFormField
            type="password"
            name="new_password"
            control={form.control}
            placeholder="Enter new Password"
          />

          <CustomFormField
            type="password"
            name="confirm_new_password"
            control={form.control}
            placeholder="Enter new password again"
          />

          <div className="flex flex-col md:flex-row gap-5">
            <Button
              variant={"secondary"}
              className="w-full"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
