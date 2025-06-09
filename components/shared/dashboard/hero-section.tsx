"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";

const HeroSection = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <section className="relative h-[264px] overflow-hidden bg-background-hero tablet:h-[292px] web:h-[486px]">
      <div className="mx-auto mt-12 max-w-[1440px] px-4 pb-10 pt-[52px] tablet:px-[30px] tablet:pt-10 web:mt-[139px] web:px-[120px] web:py-20">
        <h1 className="gibson-h1-s tablet:gibson-h1-m web:gibson-h1-l">
          {title}
        </h1>
        <h2 className="mb-6 font-pretendard text-label-natural h2-s tablet:h2-m web:mb-9 web:h2-l">
          디지털 전환을 위한 다양한 기술 자료를 만나보세요.
        </h2>
        <Button
          size="lg"
          shape="round"
          className="w-[100px] bg-primary-strong web:w-[160px]"
          onClick={() => router.push(CONTACT_PAGE)}
        >
          기술문의
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
