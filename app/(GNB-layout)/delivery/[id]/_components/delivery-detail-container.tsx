import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { DELIVERY_PAGE } from "@/constants/path";
import { useRef, useState, useEffect } from "react";
import { useGetDeliveryDetail } from "@/hooks/delivery/use-get-delivery-detail";
import DeliveryForm from "./delivery-form";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";

interface DeliveryDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const DeliveryDetailContainer = ({
  prev,
  id,
}: DeliveryDetailContainerProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const { data } = useGetDeliveryDetail(id); // 기존 배송 데이터
  const formRef = useRef<HTMLFormElement>(null); // 폼 제출을 위한 form 태그 참조 ref

  useEffect(() => {
    // 현재 상태를 히스토리에 추가
    window.history.pushState({ id }, "", window.location.href);

    const handlePopState = () => {
      if (isFormChanged) {
        setIsBackModalOpen(true);
        // 뒤로가기 이벤트를 취소하고 현재 상태를 다시 추가
        window.history.pushState({ id }, "", window.location.href);
      } else {
        router.push(`${DELIVERY_PAGE}?prev=${prev}`);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isFormChanged, router, prev, id]);

  const onClickBack = () => {
    if (isFormChanged) {
      setIsBackModalOpen(true);
    } else {
      router.push(`${DELIVERY_PAGE}?prev=${prev}`);
    }
  };

  if (!data) return null;

  // 저장하기 버튼 핸들러
  const onClickSave = () => {
    setIsModalOpen(true);
  };

  // 모달에서 저장 버튼 클릭 시 호출되는 핸들러
  const handleConfirmSave = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }
    setIsModalOpen(false);
  };

  // 뒤로가기 모달에서 확인 버튼 클릭 시 호출되는 핸들러
  const handleConfirmBack = () => {
    router.push(`${DELIVERY_PAGE}?prev=${prev}`);
  };

  return (
    <div className="relative flex w-full flex-col gap-10">
      <div className="absolute right-0 top-0 mt-[-59px]">
        <TwoButtonBar
          firstBtnTxt="목록으로"
          secondBtnTxt="저장하기"
          onClickFirstBtn={onClickBack}
          onClickSecondBtn={onClickSave}
          // disabledSecondBtn={!isFormChanged}
        />
      </div>
      <DeliveryForm
        id={id}
        data={data}
        formRef={formRef}
        onFormChange={setIsFormChanged}
      />

      {isModalOpen && (
        <TwoButtonModal
          title="저장 확인"
          desc="변경 사항을 저장하시겠습니까?"
          buttonText="저장하기"
          onClickFirstBtn={() => setIsModalOpen(false)}
          onClickSecondBtn={handleConfirmSave}
        />
      )}

      {isBackModalOpen && (
        <TwoButtonModal
          title="페이지에서 나가겠습니까?"
          desc="변경 사항이 저장되지 않을 수 있습니다."
          buttonText="나가기"
          onClickFirstBtn={() => setIsBackModalOpen(false)}
          onClickSecondBtn={handleConfirmBack}
        />
      )}
    </div>
  );
};
export default DeliveryDetailContainer;
