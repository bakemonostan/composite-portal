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
  useGetAllWorkers,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { IWorkerData } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export const LabourSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  service_rendered: z.string({
    required_error: "Service rendered is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  worker_name: z.string({
    required_error: "Worker Name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  comment: z.string().optional(),
});

type labourFormType = z.infer<typeof LabourSchema>;

export default function Labour() {
  const { projectsData } = useProjectData();
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { toast } = useToast();
  const router = useRouter();
  const { workers } = useGetAllWorkers();
  const workList = workers?.map((item: IWorkerData) => item.worker_name);
  const form = useForm<labourFormType>({
    resolver: zodResolver(LabourSchema),
    defaultValues: {
      request_type: RequestType.Labour,
    },
  });

  const projectName = projectsData?.map((item: any) => item.project_name);
  const selectedWorker = form.watch("worker_name");
  const workerService1 = workers?.find(
    (item: any) => item.worker_name === selectedWorker
  )?.service_type;

  const workerService2 = workers?.find(
    (item: any) => item.worker_name === selectedWorker
  )?.worker_service;

  const serviceRendered = [workerService1, workerService2];

  const handleSubmit = async (data: labourFormType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        worker_service: data.service_rendered,
        amount: Number(data.amount),
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        project_code: projectsData?.find(
          (item: any) => item.project_name === data.project_name
        )?.project_code,
        worker_code: workers?.find(
          (item: any) => item.worker_name === data.worker_name
        )?.worker_code,
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

  const onSubmit = (data: labourFormType) => {
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
            defaultValue="labour"
            onChange={(e: any) => setFormType(e.target.value)}
          >
            <option value="Material">Material</option>
            <option value="labour">Labour</option>
            <option value="Cash Advance Project">Cash Advance - Project</option>
            <option value="Cash Advance Office">Cash Advance - Office</option>
            <option value="Tools and Machinery Buy">
              Tools and Machinery - Buy
            </option>
            <option value="Tools and Machinery Rent">
              Tools and Machinery - Rent
            </option>
            <option value="Tools and Machinery Store">
              Tools and Machinery - Store
            </option>
          </select>
          <div className="py-4 w-full">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="w-full">
                <CustomFormSelect
                  name="project_name"
                  labelText="Project"
                  control={form.control}
                  placeholder="Select project"
                  items={projectName || ["Loading..."]}
                />
              </div>
              <div className="w-full">
                <CustomFormSelect
                  name="worker_name"
                  labelText="Worker"
                  control={form.control}
                  placeholder="Select Worker"
                  items={workList || ["Loading..."]}
                />
              </div>
            </div>
            <div className="pt-4">
              <CustomFormSelect
                name="service_rendered"
                labelText="Service Rendered"
                control={form.control}
                disabled={!selectedWorker}
                placeholder="Select A service"
                items={(serviceRendered as string[]) || ["Loading..."]}
              />
            </div>
            <div className="flex flex-col py-3 gap-4 w-full">
              <CustomFormField
                name="amount"
                label="Amount"
                control={form.control}
                placeholder="Enter Amount"
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
            <Button variant="secondary" className="w-full" type="button">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
