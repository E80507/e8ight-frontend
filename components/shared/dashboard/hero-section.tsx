"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useRouter, usePathname } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  let title = "";
  if (pathname === "/tech-library") title = "E8 Tech Library";
  else if (pathname === "/tech-insight") title = "E8 Tech Insight";
  else if (pathname === "/downloads") title = "Downloads";

  return (
    <section className="relative mt-[-48px] h-[279px] overflow-hidden tablet:h-[311px] web:mt-[-139px] web:h-[496px]">
      <Image
        src="/images/bg-white.webp"
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="(max-width:600px) 100vw, (max-width: 1025px) 50vw, 33vw"
      />

      {/* 콘텐츠 */}
      <div className="absolute top-[76px] w-full tablet:top-[120px] web:top-[219px]">
        <div className="mx-4 flex max-w-[1440px] gap-x-2 tablet:mx-4 web:mx-auto web:w-full web:px-[120px]">
          <div className="size-2 rounded-full bg-[#70D5B2] web:size-4" />
          <div>
            <h1 className="gibson-h1-s tablet:gibson-h1-m web:gibson-h1-l">
              {title}
            </h1>
            <h2 className="mb-9 font-pretendard text-label-natural h2-s tablet:h2-m web:h2-l">
              디지털 전환을 위한 다양한 기술 자료를 만나보세요.
            </h2>
            <Button
              size="lg"
              shape="round"
              className="w-[160px] bg-gray-strong"
              onClick={() => router.push(CONTACT_PAGE)}
            >
              기술문의
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
