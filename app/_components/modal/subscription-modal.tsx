"use client";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostSubscription } from "@/hooks/subscription/use-post-subscription";
import Image from "next/image";
import { X } from "lucide-react";
import OneButtonModal from "./one-button-modal";
import { useState } from "react";

interface SubscriptionModalProps {
  onClickClose: () => void;
}

const SubscriptionModal = ({ onClickClose }: SubscriptionModalProps) => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const { form, onSubmit } = usePostSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    setIsCompleteModalOpen(true);
  };

  const handleCompleteModalClose = () => {
    setIsCompleteModalOpen(false);
    onClickClose();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-[16px]">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="tablet:w-[627px] w-full rounded-[20px] overflow-hidden relative"
        >
          <button
            type="button"
            onClick={onClickClose}
            className="absolute right-[16px] top-[40px] z-20"
            aria-label="닫기 버튼"
          >
            <X className="h-[24px] w-[24px] text-[#D6D7DC]" />
          </button>

          <div className="flex flex-col gap-5">
            <div className="relative tablet:h-[464px] h-[423px] tablet:px-[40px] tablet:pt-[84px] px-[16px] pt-[84px] pb-[60px] overflow-hidden">
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
              <div className="absolute inset-0 bg-black/70 z-0" />

              {/* 콘텐츠 */}
              <div className="relative z-10 flex flex-col items-center tablet:gap-[32px] gap-[20px] h-full text-white text-center">
                <div className="flex flex-col gap-[17px]">
                  <h2 className="web:gibson-heading-1 tablet:gibson-heading-2 gibson-heading-3">
                    Global No.1<br />
                    Digital Twin Platform
                  </h2>
                  
                  <p className="web:pretendard-subtitle-l tablet:pretendard-subtitle-m pretendard-subtitle-s">뉴스레터를 구독하여 새로운 최신 테크 이야기를 만나보세요.</p>
                </div>

                <div className="w-full">
                  <CustomInputField
                    form={form}
                    name="email"
                    placeholder="이메일을 입력해주세요."
                    className="tablet:w-[328px] rounded-[100px] text-black pretendard-body-2 px-[24px] w-full h-[48px] mx-auto"
                  />

                  <div className="flex justify-center tablet:mt-[32px] mt-[20px]">
                    <Button type="submit" size="lg" variant="outline" shape="round" className="w-[160px] pretendard-title-s placeholder:text-[#C8C9D0]">
                      뉴스레터 신청하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {isCompleteModalOpen && (
        <OneButtonModal
          title="뉴스레터 구독이 완료되었습니다"
          desc="매주 새로운 테크 소식을 전달해드릴게요!"
          onClickConfirm={handleCompleteModalClose}
        />
      )}
    </div>
  );
};

export default SubscriptionModal;
