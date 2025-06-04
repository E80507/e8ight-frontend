import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface OneButtonModalProps {
  title: string;
  desc?: string;
  onClickConfirm: () => void;
  buttonText?: string;
  primaryText?: string;
  version?: "original" | "cupertino"; // UI version
}

const OneButtonModal = ({
  title,
  desc,
  buttonText = "확인",
  onClickConfirm,
  primaryText,
  version = "original",
}: OneButtonModalProps) => {
  const isOriginal = version === "original"; // UI version original 여부

  // 모달이 열리면 스크롤 비활성화, 닫히면 활성화
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트가 언마운트되면 스크롤 활성화
    };
  }, []);

  // 외부 영역 클릭으로 모달창 닫기 핸들러
  // const handleBackdropClick = (event: React.MouseEvent) => {
  //   // 백드롭 영역을 클릭한 경우에만 모달을 닫음
  //   if (event.target === event.currentTarget) {
  //     onClickConfirm();
  //   }
  // };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[102] flex items-center justify-center bg-black/60 px-5">
      <div className="flex w-full max-w-[350px] flex-col rounded-[12px] bg-white">
        <div
          className={cn(
            "flex flex-col gap-2 text-center",
            {
              "pt-8 pb-6 px-4": isOriginal,
            },
            {
              "p-6": !isOriginal,
            },
          )}
        >
          <p className="pretendard-title-l">
            {primaryText && <span>{primaryText}</span>}
            {title}
          </p>
          <p className="text-label-natural pretendard-body-3">{desc}</p>
        </div>
        <div
          className={cn({
            "px-4 pb-4": isOriginal,
          })}
        >
          {isOriginal ? (
            <Button size={"lg"} onClick={onClickConfirm} className="w-full">
              {buttonText}
            </Button>
          ) : (
            <button
              onClick={onClickConfirm}
              className="w-full border py-[13px] text-center text-primary"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default OneButtonModal;
