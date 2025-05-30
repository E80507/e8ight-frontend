import formattedDate from "@/util/date";
import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn } from "react-hook-form";
import { DeliveryDetailRes } from "@/app/api/dto/delivery";
import {
  handleDeliveryStatusKRText,
  handlePrintStatusKRText,
} from "@/util/string";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";
import { z } from "zod";
import { deliveryPatchSchema } from "@/schema/delivery";
import CheckBox from "@/app/_components/check-box";
import { ArtworkCategory } from "@/app/api/dto/artwork";
import FilterName from "@/app/_components/table/filter-name";
import { ArtworkTable } from "./artwork-table";
import { useState } from "react";
import DeliveryCancelModal from "@/app/(GNB-layout)/delivery/_components/delivery-cancel-modal";
import { DeliveryStatus } from "@/app/api/dto/member";
import { usePostDeliveryCancel } from "@/hooks/delivery/use-post-delivery-cancel";
import { useParams } from "next/navigation";

interface DeliveryStatusInfoProps {
  data: DeliveryDetailRes;
  form: UseFormReturn<z.infer<typeof deliveryPatchSchema>>;
}

const DELIVERY_TYPE_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: ArtworkCategory.PHOTO,
    label: "엽서 (102x152mm) / 유광 (반광택)",
  },
  {
    value: ArtworkCategory.CARD,
    label: "엽서 (102x152mm) / 무광 (프리미엄 매트)",
  },
  {
    value: ArtworkCategory.STICKER,
    label: "엽서 (102x152mm) / 유광 (고광택 + 점착)",
  },
  // {
  //   value: ArtworkCategory.POSTCARD_SEMI_GLOSS_PEARL,
  //   label: "엽서 (102x152mm) / 유광 (반광택 + 펄)",
  // },
  // {
  //   value: ArtworkCategory.MINI_POSTER_SEMI_GLOSS,
  //   label: "미니포스터 (152x203mm) / 유광 (반광택)",
  // },
  // {
  //   value: ArtworkCategory.MINI_POSTER_SEMI_GLOSS_PEARL,
  //   label: "미니포스터 (152x203mm) / 유광 (반광택 + 펄)",
  // },
  // {
  //   value: ArtworkCategory.POSTER_SEMI_GLOSS,
  //   label: "포스터 (210x297mm) / 유광 (반광택)",
  // },
  // {
  //   value: ArtworkCategory.POSTER_HIGH_GLOSS,
  //   label: "포스터 (210x297mm) / 유광 (고광택)",
  // },
];

const DeliveryStatusInfo = ({ data, form }: DeliveryStatusInfoProps) => {
  const { id } = useParams();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(data.artworks);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { onSubmit, loading } = usePostDeliveryCancel();
  // 체크 박스 변경 핸들러
  const handleChangeValue = (val: string | number) => {
    // 전체 선택일 경우
    if (val === "all") {
      return setFilteredData([...data.artworks]);
    }
    const newData = data.artworks.filter((item) => item.printCategory === val);
    setFilteredData([...newData]);
  };

  const handleConfirmCancel = async (status: string) => {
    if (status === "cancel") {
      await onSubmit([id as string]);
    }
    setShowCancelModal(false);
    window.location.reload();
  };

  if (!filteredData) return null;
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">배송 상태 정보</p>
      <div className="w-full shrink-0">
        <ShortRow
          size="md"
          label="출력 상태"
          value={handlePrintStatusKRText(data.printStatus)}
        />
        <div className={`flex border-x border-t`}>
          <FilterName size={"md"} name={"작품 별 출력 상태"} />
          <div className={`flex w-full items-center truncate body-2`}>
            <div className="w-full">
              <CheckBox
                handleChangeValue={handleChangeValue}
                checkboxClass="border-none"
                conditions={DELIVERY_TYPE_ARRAY}
              />
              <div className="border-t px-5 py-4">
                <ArtworkTable
                  data={filteredData}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                />
              </div>
            </div>
          </div>
        </div>

        <ShortRow
          size="md"
          label="처리 상태"
          value={handleDeliveryStatusKRText(data.deliveryStatus)}
          buttonText={
            data.deliveryStatus !== DeliveryStatus.WAITING ? "" : "배송 취소"
          }
          onClick={() => setShowCancelModal(true)}
        />
        <ShortRow size="md" label="처리 진행일" value={""}>
          {data.deliveryDate ? (
            <p className="flex items-center gap-2">
              <span>{formattedDate(data.deliveryDate, "DEFAULT_FULL")}</span>
              <span className="text-[#2A67FF]">
                {formattedDate(data.deliveryDate)}
              </span>
            </p>
          ) : (
            "-"
          )}
        </ShortRow>
        <ShortRow
          size="md"
          label="운송장 번호"
          value={data.trackingNumber ?? "-"}
        />
        <ShortRow size="md" isLastRow label="회원 메모" value={""}>
          <div className="w-full py-4">
            <CustomTextareaField
              textAreaClass="min-h-[200px]"
              form={form}
              name="memo"
              placeholder="메모를 입력해주세요"
            />
          </div>
        </ShortRow>
      </div>
      {showCancelModal && (
        <DeliveryCancelModal
          title="배송 취소"
          buttonText="배송 취소"
          loading={loading}
          onClickFirstBtn={() => setShowCancelModal(false)}
          onClickSecondBtn={(status) => handleConfirmCancel(status)}
        />
      )}
    </div>
  );
};
export default DeliveryStatusInfo;
