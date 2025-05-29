"use client";

import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostSubscription } from "@/hooks/subscription/use-post-subscription";

const SubscriptionSection = () => {
  const { onSubmit, form } = usePostSubscription();

  return (
    <section>
      {/* 이미지 배경 카드 */}
      <div
        className="relative web:h-[520px] tablet:h-[503px] h-[474px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/subscription.webp")' }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/0 z-0" />

        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-col justify-center items-center gap-[32px] h-full text-white text-center">
          <div className="flex flex-col gap-[17px]">
            <h2 className="web:gibson-heading-1 tablet:gibson-heading-2 gibson-heading-3">
              Global No.1<br />
              Digital Twin Platform
            </h2>
            
            <p className="web:pretendard-subtitle-l tablet:pretendard-subtitle-m pretendard-subtitle-s">뉴스레터를 구독하여 새로운 최신 테크 이야기를 만나보세요.</p>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit}>
              <CustomInputField
                form={form}
                name="email"
                placeholder="이메일을 입력해주세요."
                className="w-[328px] rounded-[100px] text-black pretendard-body-2 px-[24px]"
              />

              <div className="flex justify-center mt-[32px]">
                <Button type="submit" size="lg" variant="outline" shape="round" className="w-[160px] pretendard-title-s placeholder:text-[#C8C9D0]">
                  뉴스레터 신청하기
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
