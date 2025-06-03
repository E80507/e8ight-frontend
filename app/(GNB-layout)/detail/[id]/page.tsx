import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Share2Icon } from "lucide-react";

const DetailPage = () => {
  return (
    <div>
      <div className="max-w-[1440px] h-[299px] bg-gray-500"></div>

      <div className="px-[120px] py-[80px]">
        <div className="border-b border-[#EEEFF1] pb-[48px]">
          <p className="pretendard-h1-l">타이틀</p>

          <div className="flex items-center gap-[8px] mt-[16px] pretendard-body-2 text-[#A7A9B4]">
            <span>2024-01-12</span>
            <span className="before:content-[''] before:inline-block before:w-[1px] before:h-[14px] before:bg-[#A7A9B4] before:mx-2"></span>
            <span>저자: 홍길동</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-[8px] mt-[40px]">
              {["태그1", "태그2", "태그3"].map((tag, index) => (
                <div
                  key={index}
                  className="px-[16px] py-[8px] h-[40px] rounded-[8px] pretendard-title-m bg-[#F4F4F6]"
                >
                  {tag}
                </div>
              ))}
            </div>

            <button className="flex items-center gap-[8px] px-[16px] py-[12px] bg-[#F9FAFA] border border-[#D6D7DC] rounded-[10px]">
              <Share2Icon /> 공유하기
            </button>
          </div>
        </div>

        <div className="mt-[40px]">장비 산업은...</div>

        <div className="flex flex-col gap-[24px] mt-[40px]">
          <div className="pretendard-subtitle-l text-[#A7A9B4]">
            이에이트 SNS
          </div>

          <div className="flex gap-[40px]">
            {[
              { icon: "linkedin", alt: "LinkedIn" },
              { icon: "blog", alt: "Blog" },
              { icon: "youtube", alt: "YouTube" },
              { icon: "instagram", alt: "Instagram" },
            ].map((social) => (
              <Link key={social.icon} href="/">
                <Image
                  src={`/svg/icon/${social.icon}.svg`}
                  alt={social.alt}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center relative h-[360px] overflow-hidden">
        <Image
          src="/images/subscription.webp"
          alt="Subscription background"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
          quality={90}
        />

        <div className="flex justify-between items-center w-[1040px]">
          <div className="flex flex-col gap-[8px]">
            <div className="relative gibson-heading-1 text-white">
              Global No.1
              <br />
              Digital Twin Platform
            </div>

            <div className="relative gibson-heading-3 text-white">
              The Evolution of Digital Transformation
            </div>
          </div>

          <Button
            variant="outline"
            shape={"round"}
            className="relative w-[200px] h-[59px]"
          >
            기술 문의
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
