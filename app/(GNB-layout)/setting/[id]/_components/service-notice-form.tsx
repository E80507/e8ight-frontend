import { Form } from "@/components/ui/form";
import ServiceNoticeBasicInfo from "./service-notice-basic-info";
import ServiceNoticeDetailInfo from "./service-notice-detail-info";
import ServiceNoticeStatusInfo from "./service-notice-status-info";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import { RefObject } from "react";
import { usePatchServiceNotice } from "@/hooks/setting/use-patch-service-notice";

interface ServiceNoticeFormProps {
  formRef: RefObject<HTMLFormElement>; // 폼 제출을 위한 폼 태그 참조 ref
  data: ServiceNoticeRes; // 기존 공지 데이터
  id: string; // 공지 id
}

const ServiceNoticeForm = ({ formRef, data, id }: ServiceNoticeFormProps) => {
  const { form, onSubmit } = usePatchServiceNotice(id, data, () => {});

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10" ref={formRef} onSubmit={onSubmit}>
        <ServiceNoticeBasicInfo data={data} />
        <ServiceNoticeDetailInfo form={form} data={data} />
        <ServiceNoticeStatusInfo form={form} data={data} />
      </form>
    </Form>
  );
};
export default ServiceNoticeForm;
