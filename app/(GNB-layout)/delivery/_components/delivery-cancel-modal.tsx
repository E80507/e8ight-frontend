import { useEffect, useState } from "react";
import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DeliveryCancelModalProps {
  title: string; // 모달 타이틀
  loading?: boolean; // 버튼 로딩 상태
  buttonText: string; // 버튼 텍스트
  onClickFirstBtn: () => void; // 버튼 핸들러
  onClickSecondBtn: (status: string) => void; // 버튼 핸들러
}

const DeliveryCancelModal = ({
  title,
  loading,
  buttonText,
  onClickFirstBtn,
  onClickSecondBtn,
}: DeliveryCancelModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("waiting");

  // body overflow 설정
  useEffect(() => {
    // 모달이 열리면 body 스크롤을 막음
    document.body.style.overflow = "hidden";

    // 모달이 닫히면 body 스크롤을 다시 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70">
      <div className="w-[642px] rounded-[20px] bg-white p-8">
        <div className="flex flex-col items-end gap-6">
          <div className="w-full">
            <p className="mb-6 heading-3">{title}</p>
            <RadioGroup
              defaultValue="waiting"
              onValueChange={(value) => setSelectedStatus(value)}
              className="flex gap-10"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waiting" id="waiting" />
                <Label className="body-2-bold" htmlFor="waiting">
                  출고 대기
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cancel" id="cancel" />
                <Label className="body-2-bold" htmlFor="cancel">
                  배송 취소(취소 시 복구 불가)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <TwoButtonBar
            loading={loading}
            size="lg"
            firstBtnTxt="취소"
            secondBtnTxt={buttonText}
            onClickFirstBtn={onClickFirstBtn}
            onClickSecondBtn={() => onClickSecondBtn(selectedStatus)}
            disabled={selectedStatus !== "cancel"}
          />
        </div>
      </div>
    </div>
  );
};
export default DeliveryCancelModal;
