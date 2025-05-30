import { Form } from "@/components/ui/form";
import { RefObject } from "react";
import NoticeBasicInfo from "./notice-basic-info";
import NoticeDetailInfo from "./notice-detail-info";
import NoticeStatusInfo from "./notice-status-info";
import { NoticeDetailRes } from "@/app/api/dto/notice";
import { usePatchNotice } from "@/hooks/notice/use-patch-notice";

interface NoticeFormProps {
  id: string;
  data: NoticeDetailRes;
  formRef: RefObject<HTMLFormElement>;
}
const NoticeForm = ({ id, data, formRef }: NoticeFormProps) => {
  const { form, onSubmit } = usePatchNotice(id, data.isBlocked);
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <NoticeBasicInfo data={data} />
        <NoticeDetailInfo data={data} />
        <NoticeStatusInfo form={form} data={data} />
      </form>
    </Form>
  );
};
export default NoticeForm;
