"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CONTACT_PAGE } from "@/constants/path";

export default function SubscriptionBanner() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center relative tablet:h-[360px] h-[425px] overflow-hidden">
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
      <div className="flex flex-col gap-[32px] tablet:flex-row tablet:justify-between tablet:text-left text-center items-center web:w-[1040px] w-full tablet:px-[30px]">
        {/* 텍스트 컨테이너 */}
        <div className="flex flex-col gap-[8px]">
          <div className="relative tablet:gibson-heading-1 gibson-heading-2 text-white">
            Global No.1
            <br />
            Digital Twin Platform
          </div>

          <div className="relative tablet:gibson-heading-3 pretendard-subtitle-m text-white">
            The Evolution of Digital Transformation
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          shape="round"
          className="relative w-[200px] h-[59px]"
          onClick={() => router.push(CONTACT_PAGE)}
        >
          기술 문의
        </Button>
      </div>
    </div>
  );
}
