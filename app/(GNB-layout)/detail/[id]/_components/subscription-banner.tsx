"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CONTACT_PAGE } from "@/constants/path";

export default function SubscriptionBanner() {
  const router = useRouter();

  return (
    <div className="relative flex h-[425px] items-center justify-center overflow-hidden tablet:h-[360px]">
      {/* 배경 이미지 */}
      <Image
        src="/images/subscription.webp"
        alt="Subscription background"
        fill
        className="object-cover"
        loading="lazy"
        sizes="100vw"
        quality={90}
      />

      {/* 텍스트 컨테이너 */}
      <div className="flex w-full flex-col items-center gap-[32px] text-center tablet:flex-row tablet:justify-between tablet:px-[30px] tablet:text-left web:w-[1040px]">
        <div className="relative text-white gibson-heading-2 tablet:gibson-heading-1">
          Global No.1
          <br />
          Digital Twin Platform
        </div>

        {/* 기술 문의 버튼 */}
        <Button
          type="button"
          variant="outline"
          shape="round"
          className="relative h-[59px] w-[200px]"
          onClick={() => router.push(CONTACT_PAGE)}
        >
          기술 문의
        </Button>
      </div>
    </div>
  );
}
