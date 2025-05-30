import ShortRow from "@/app/_components/table/short-row";
import InputShortRow from "@/app/_components/table/input-short-row";
import { DeliveryDetailRes } from "@/app/api/dto/delivery";
import { handleCommaPrice } from "@/util/price";
import { handlePhoneNumberInput } from "@/util/number";
import FilterName from "@/app/_components/table/filter-name";
import { UseFormReturn } from "react-hook-form";
import { deliveryPatchSchema } from "@/schema/delivery";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePatchDelivery } from "@/hooks/delivery/use-patch-delivery";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";

interface DeliveryDetailInfoProps {
  data: DeliveryDetailRes;
  form: UseFormReturn<z.infer<typeof deliveryPatchSchema>>;
}

const DeliveryDetailInfo = ({ data, form }: DeliveryDetailInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handlePatchDelivery } = usePatchDelivery(data.id, data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickSave = async () => {
    // const formValues = form.getValues();
    // await handlePatchDelivery(formValues);
    // setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const formValues = form.getValues();
    await handlePatchDelivery(formValues);
    setIsEditing(false);
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="heading-4">배송 진행 정보</p>
        {data.deliveryStatus === "WAITING" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => (isEditing ? onClickSave() : setIsEditing(true))}
          >
            {isEditing ? "저장하기" : "배송 정보 변경"}
          </Button>
        )}
      </div>
      <div>
        <ShortRow
          size="md"
          label="배송 수량"
          value={handleCommaPrice(data.quantity, "장")}
        />
        <ShortRow
          size="md"
          label="배송 상품 총액"
          value={handleCommaPrice(data.totalPrice, "P")}
        />

        <div className={`flex border-x border-t`}>
          <FilterName size={"md"} name={"주문자 정보"} />
          <div className={`flex w-full items-center truncate body-2`}>
            <div className="w-full">
              <ShortRow
                rowClass="border-none"
                size="md"
                label="이름"
                value={data.ordererName}
              />
              <ShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="전화번호"
                value={handlePhoneNumberInput(data.ordererPhone)}
              />
              <ShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="이메일"
                value={data.email}
              />
            </div>
          </div>
        </div>

        <div className={`flex border`}>
          <FilterName size={"md"} name={"수령자 정보"} />
          <div className={`flex w-full items-center truncate body-2`}>
            <div className="w-full">
              <InputShortRow
                rowClass="border-none"
                size="md"
                label="이름"
                value={form.getValues("recipientName") ?? data.recipientName}
                onChange={(value) => {
                  form.setValue("recipientName", value);
                }}
                disabled={!isEditing}
              />
              <InputShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="전화번호"
                value={form.getValues("recipientPhone") ?? data.recipientPhone}
                onChange={(value) => {
                  form.setValue("recipientPhone", value);
                }}
                disabled={!isEditing}
              />
              <InputShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="우편번호"
                value={form.getValues("postalCode") ?? data.postalCode}
                onChange={(value) => {
                  form.setValue("postalCode", value);
                }}
                disabled={!isEditing}
              />
              <InputShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="기본주소"
                value={
                  form.getValues("deliveryAddress") ?? data.deliveryAddress
                }
                onChange={(value) => {
                  form.setValue("deliveryAddress", value);
                }}
                disabled={!isEditing}
              />
              <InputShortRow
                noBorder
                rowClass="border-t"
                size="md"
                label="상세주소"
                value={
                  form.getValues("deliveryAddressDetail") ??
                  data.deliveryAddressDetail
                }
                onChange={(value) => {
                  form.setValue("deliveryAddressDetail", value);
                }}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TwoButtonModal
          title="저장 확인"
          desc="변경 사항을 저장하시겠습니까?"
          buttonText="저장하기"
          onClickFirstBtn={() => setIsModalOpen(false)}
          onClickSecondBtn={handleSave}
        />
      )}
    </div>
  );
};
export default DeliveryDetailInfo;
