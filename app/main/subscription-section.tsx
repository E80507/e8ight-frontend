"use client";

import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostSubscription } from "@/hooks/subscription/use-post-subscription";
import Image from "next/image";

const SubscriptionSection = () => {
  const { onSubmit, form } = usePostSubscription();

  return (
    <section>
      {/* 이미지 배경 카드 */}
      <div className="relative h-[474px] overflow-hidden tablet:h-[503px] web:h-[520px]">
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
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black to-black/0" />

        {/* 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-[32px] text-center text-white">
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

          <Form {...form}>
            <form onSubmit={onSubmit}>
              <CustomInputField
                form={form}
                name="email"
                placeholder="이메일을 입력해주세요."
                className="w-[328px] rounded-[100px] px-[24px] text-black pretendard-body-2"
              />

              <div className="mt-[32px] flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  shape="round"
                  className="w-[160px] pretendard-title-s placeholder:text-[#C8C9D0]"
                >
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
