import { Form } from "@/components/ui/form";
import { RefObject } from "react";
import { ReportRes, ReportTarget } from "@/app/api/dto/report";
import ReportBasicInfo from "./report-basic-info";
import ReportDetailInfo from "./report-detail-info";
import ReportStatusInfo from "./report-status-info";
import { usePatchReportStatus } from "@/hooks/report/use-patch-report-status";

interface ReportFormProps {
  id: string;
  data: ReportRes;
  formRef: RefObject<HTMLFormElement>;
}
const ReportForm = ({ id, data, formRef }: ReportFormProps) => {
  const { form, onSubmit } = usePatchReportStatus(id, data.resolution);
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <ReportBasicInfo data={data} />
        <ReportDetailInfo data={data} />
        {data.target === ReportTarget.POST && (
          <ReportStatusInfo form={form} data={data} />
        )}
      </form>
    </Form>
  );
};
export default ReportForm;
