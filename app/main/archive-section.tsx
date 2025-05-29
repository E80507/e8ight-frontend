"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const archiveData = [
  {
    id: 1,
    title: "포스트 제목이 들어갑니다.",
    bgImage: "/images/archive1.webp",
  },
  {
    id: 2,
    title: "포스트 제목이 들어갑니다.",
    bgImage: "/images/archive2.webp",
  },
];

const ArchiveSection = () => {
  return (
    <section className="web:py-[100px] web:px-[120px] py-[80px] tablet:px-[30px] px-[16px]">
      <div className="flex flex-col web:gap-[40px] tablet:gap-[32px] gap-[24px] mx-auto max-w-[1200px]">
        <div className="web:h1-l tablet:h1-m h1-r">자료실</div>

        <div className="grid web:grid-cols-2 web:gap-[24px] gap-[16px] grid-cols-1">
          {archiveData.map(({ id, title, bgImage }) => (
            <div
              key={id}
              className="relative flex flex-col justify-between p-[32px] border rounded-[20px] overflow-hidden bg-cover bg-center web:aspect-[1.39/1] tablet:aspect-[1.8/1] aspect-[1/1]"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <div className="absolute inset-0 bg-black opacity-[0.21] z-0" />

              <div className="relative z-10 flex flex-col gap-[16px]">
                <Image src="/svg/archive-logo.svg" alt="" width={68} height={29} className="-mt-px" />
                <div className="h1-m text-white">{title}</div>
              </div>

              <Button size="lg" variant="outline" shape="round" className="relative z-10 ml-auto tablet:w-[160px] tablet:h-[48px] w-[120px] h-[37px]">
                PDF 다운로드
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" variant="outline" shape="round" className="tablet:w-[160px] tablet:h-[48px] w-[120px] h-[37px]">
            더보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArchiveSection;
