import { DeliveryRes, DeliveryStatus } from "@/app/api/dto/delivery";
import { Button } from "@/components/ui/button";
import { usePostDownloadDeliveryExcel } from "@/hooks/delivery/use-post-donwload-delivery-excel";
import { useUploadExcel } from "@/hooks/excel/use-upload-excel";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import DeliveryCancelModal from "./delivery-cancel-modal";
import { usePostDeliveryCancel } from "@/hooks/delivery/use-post-delivery-cancel";

interface DeliverySettingButtonBoxProps {
  selectedIds: string[];
  totalData: DeliveryRes[];
}

const DeliverySettingButtonBox = ({
  selectedIds,
  totalData,
}: DeliverySettingButtonBoxProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isCancelled = totalData.some(
    (data) =>
      selectedIds.includes(data.id) &&
      data.deliveryStatus !== DeliveryStatus.WAITING,
  );
  const isDisabled = selectedIds.length === 0 || isCancelled;
  const inputRef = useRef<HTMLInputElement>(null);

  const { onSubmit, loading } = usePostDownloadDeliveryExcel();
  const uploadExcel = useUploadExcel();
  const { onSubmit: onSubmitCancel, loading: cancelLoading } =
    usePostDeliveryCancel();

  // 엑셀 시트 다운로드 핸들러
  const onClickDownload = () => {
    // 선택된 아이디를 가진 배열
    const selectedData = totalData.filter((data) =>
      selectedIds.includes(data.id),
    );

    // 출고 상태가 '대기'인 데이터만 가능
    if (
      selectedData.some(
        (data) => data.deliveryStatus === DeliveryStatus.COMPLETED,
      )
    ) {
      return alert("출고 상태가 '대기'일 경우만 엑셀 시트 다운로드가 가능해요");
    }

    onSubmit(selectedIds);
  };

  // 엑셀 업로드 핸들러
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      const acceptedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx files
        "application/vnd.ms-excel", // for .xls files
        "text/csv", // .csv
      ];

      // 지원하지 않는 파일 형식일 경우
      if (!acceptedTypes.includes(newFile.type)) {
        return toast({
          title: "지원하지 않는 파일 형식이에요",
        });
      }

      if (newFile.size > 30 * 1024 * 1024) {
        return toast({
          title: `파일 용량이 제한 크기(30MB)를 초과했어요`,
        });
      }

      const formData = new FormData();
      formData.append("file", newFile);
      await uploadExcel(formData);
    }
  };

  // 출고 상태 버튼 핸들러
  const onClickExcelButton = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  // 배송 취소 모달 핸들러
  const handleCancelDelivery = () => {
    setShowCancelModal(true);
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = async (status: string) => {
    console.log(selectedIds);
    if (status === "cancel") {
      await onSubmitCancel(selectedIds);
    }
    setShowCancelModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={onClickDownload}
          loading={loading}
          className="min-w-[70px]"
          loadColor="white"
          disabled={isDisabled}
          variant={"outline"}
          size={"sm"}
          type="button"
        >
          배송 엑셀 시트 다운로드
        </Button>
        <div className="relative">
          <Button
            onClick={onClickExcelButton}
            className="relative min-w-[70px]"
            variant={"outline"}
            size={"sm"}
            type="button"
          >
            송장 번호 업로드
          </Button>
          <input
            ref={inputRef}
            className="absolute inset-0 hidden"
            type="file"
            accept={"xlsx, xls, csv"}
            onChange={(e) => onChangeFile(e)}
          />
        </div>
        <div className="relative">
          <Button
            onClick={handleCancelDelivery}
            className="relative min-w-[70px]"
            disabled={isDisabled}
            variant={"outline"}
            size={"sm"}
            type="button"
          >
            배송 취소
          </Button>
        </div>
      </div>

      {showCancelModal && (
        <DeliveryCancelModal
          title="출고 상태 변경"
          buttonText="변경"
          loading={cancelLoading}
          onClickFirstBtn={handleCloseModal}
          onClickSecondBtn={(status) => handleConfirmCancel(status)}
        />
      )}
    </>
  );
};
export default DeliverySettingButtonBox;
