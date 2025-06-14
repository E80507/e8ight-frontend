"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import OneButtonModal from "./one-button-modal";
import { useState } from "react";
import ReactDOM from "react-dom";

interface SubscriptionModalProps {
  onClickClose: () => void;
}

const SubscriptionModal = ({ onClickClose }: SubscriptionModalProps) => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleCompleteModalClose = () => {
    setIsCompleteModalOpen(false);
    onClickClose();
  };

  // 뉴스레터 신청 버튼 클릭 핸들러
  const handleMoveStibee = () => {
    window.open(process.env.NEXT_PUBLIC_STIBEE_URL, "_blank");
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[101] flex items-center justify-center bg-black/70 px-[16px]"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className="relative w-full overflow-hidden rounded-[20px] tablet:w-[627px]"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClickClose}
          className="absolute tablet:right-[40px] top-[40px] right-[18px] tablet:top-[40px] z-20"
          aria-label="닫기 버튼"
        >
          <X className="size-[24px] text-[#D6D7DC]" />
        </button>

        <div className="flex flex-col gap-5">
          <div className="relative flex items-center justify-center h-[423px] overflow-hidden px-[16px] tablet:h-[464px] tablet:px-[40px]">
            <Image
              src="/images/subscription.webp"
              alt="Subscription background"
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
              quality={90}
            />

            {/* 오버레이 */}
            <div className="absolute inset-0 z-0 bg-black/70" />

            {/* 콘텐츠 */}
            <div className="relative z-10 flex flex-col items-center gap-[20px] text-center text-white tablet:gap-[32px]">
              <div className="flex flex-col gap-[17px]">
                <h2 className="gibson-heading-3 tablet:gibson-heading-2 web:gibson-heading-1">
                  Global No.1
                  <br />
                  Digital Twin Platform
                </h2>

                <p className="pretendard-subtitle-s tablet:pretendard-subtitle-m web:pretendard-subtitle-l">
                  뉴스레터를 구독하여 새로운 최신 테크 이야기를 만나보세요.
                </p>
              </div>

              <Button
                type="button"
                size="lg"
                variant="outline"
                shape="round"
                className="w-[160px] pretendard-title-s placeholder:text-[#C8C9D0]"
                onClick={handleMoveStibee}
              >
                뉴스레터 신청하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isCompleteModalOpen && (
        <OneButtonModal
          title="뉴스레터 구독이 완료되었습니다"
          desc="매주 새로운 테크 소식을 전달해드릴게요!"
          onClickConfirm={handleCompleteModalClose}
        />
      )}
    </div>,
    document.body,
  );
};

export default SubscriptionModal;
