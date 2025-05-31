"use client";

import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import CarouselBox from "@/components/shared/carousel";
// import { useGetCarouselData } from "@/hooks/main/use-get-carousel-data";
import {
  TECH_INSIGHTS_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
} from "@/constants/path";
import { useRouter } from "next/navigation";

const HistorySection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  // const { data } = useGetCarouselData();

  const handleCategoryClick = (category: string) => {
    if (category === "tech-insights") router.push(TECH_INSIGHTS_PAGE);
    else if (category === "downloads") router.push(DOWNLOADS_PAGE);
    else router.push(TECH_LIBRARY_PAGE);
  };

  const items = [
    {
      category: "tech-insights",
      title: "Tech Insight",
      description:
        "Lorem ipsum dolor sit amet, labore natus. Numquam labore soluta quo corrupti",
    },
    {
      category: "tech-library",
      title: "Tech Library",
      description: "우리가 만들어가는 혁신.",
    },
    {
      category: "downloads",
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
    <section className="mx-auto max-w-[1440px] px-4 pt-[80px] tablet:px-[30px] web:px-[120px] web:py-[100px]">
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
              <p className="mb-4 text-primary subtitle-s tablet:subtitle-m web:subtitle-l">
                {items[current].title}
              </p>
              <p className="break-words leading-relaxed h2-r tablet:h2-l web:h2-l">
                {items[current].description}
              </p>
            </div>

            <Button
              size="lg"
              variant="outline"
              shape="round"
              className="hidden tablet:block"
              onClick={() => handleCategoryClick(items[current].category)}
            >
              더보기
            </Button>
            <Button // 외부 링크로 이동(추후 연결)
              size="md"
              variant="outline"
              shape="round"
              className="tablet:hidden"
              onClick={() => handleCategoryClick(items[current].category)}
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
