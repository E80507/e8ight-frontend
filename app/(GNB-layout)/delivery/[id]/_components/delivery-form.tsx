import { Form } from "@/components/ui/form";
import ServiceNoticeBasicInfo from "./delivery-notice-basic-info";
import { RefObject, useEffect } from "react";
import { DeliveryDetailRes } from "@/app/api/dto/delivery";
import { usePatchDeliveryMemo } from "@/hooks/delivery/use-patch-delivery-memo";
import { usePatchDelivery } from "@/hooks/delivery/use-patch-delivery";
import DeliveryDetailInfo from "./delivery-detail-info";
import DeliveryStatusInfo from "./delivery-status-info";

interface DeliveryFormProps {
  formRef: RefObject<HTMLFormElement>; // 폼 제출을 위한 폼 태그 참조 ref
  data: DeliveryDetailRes; // 기존 공지 데이터
  id: string; // 공지 id
  onFormChange: (changed: boolean) => void;
}

const DeliveryForm = ({
  formRef,
  data,
  id,
  onFormChange,
}: DeliveryFormProps) => {
  const { form: formMemo, handlePatchMemo } = usePatchDeliveryMemo(
    id,
    data.memo ?? "",
  );
  const { form: formDelivery } = usePatchDelivery(id, data);

  useEffect(() => {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        onFormChange(true);
      }
    };

    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleInput);
    return () => {
      document.removeEventListener("input", handleInput);
      document.removeEventListener("change", handleInput);
    };
  }, [onFormChange]);

  return (
    <Form {...formMemo}>
      <form
        className="flex flex-col gap-10"
        ref={formRef}
        onSubmit={handlePatchMemo}
      >
        <ServiceNoticeBasicInfo data={data} />
        <DeliveryDetailInfo form={formDelivery} data={data} />
        <DeliveryStatusInfo form={formMemo} data={data} />
      </form>
    </Form>
  );
};
export default DeliveryForm;
