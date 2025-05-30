"use client";

import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import CarouselBox from "@/components/shared/carousel";

const HistorySection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const items = [
    {
      title: "Tech Insight",
      description:
        "Lorem ipsum dolor sit amet, labore natus. Numquam labore soluta quo corrupti",
    },
    {
      title: "Tech Library",
      description: "우리가 만들어가는 혁신.",
    },
    {
      title: "Downloads",
      description: "기술과 사람의 연결.",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-[1440px] pt-[80px] mobile:px-4 tablet:px-[30px] web:px-[120px] web:py-[100px]">
      <div className="flex flex-col gap-x-10 web:flex-row web:justify-between">
        {/* 텍스트 영역 */}
        <div className="flex min-w-0 grow flex-col web:h-[523px] web:min-w-[334px] web:max-w-[455px] web:justify-between">
          <div className="hidden items-start gap-x-2 web:flex">
            <div className="size-4 rounded-full bg-primary" />
            <h3 className="display-1">
              이에이트의 <br />
              기술 이야기를
              <br />
              전합니다.
            </h3>
          </div>

          {/* 캐러셀: tablet 이하에만 보이게 */}
          <div className="mb-[26px] w-full web:hidden">
            <CarouselBox setApi={setApi} items={items} />
          </div>

          {/* 텍스트 본문 */}
          <div>
            <div className="mb-8">
              <p className="mb-4 text-primary mobile:subtitle-s tablet:subtitle-m web:subtitle-l">
                {items[current].title}
              </p>
              <p className="break-words leading-relaxed h2-r tablet:h2-l web:h2-l">
                {items[current].description}
              </p>
            </div>

            <Button // 외부 링크로 이동(추후 연결)
              size="lg"
              variant="outline"
              shape="round"
              className="hidden tablet:block"
            >
              더보기
            </Button>
            <Button // 외부 링크로 이동(추후 연결)
              size="md"
              variant="outline"
              shape="round"
              className="tablet:hidden"
            >
              더보기
            </Button>
          </div>
        </div>

        {/* 캐러셀: web 이상에만 보이게 */}
        <div className="hidden web:block">
          <CarouselBox setApi={setApi} items={items} />
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
