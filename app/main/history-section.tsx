"use client";

import { Button } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import CarouselBox from "./carousel-box";
import { getHistoryData } from "../api/main";
import useSWR from "swr";
import {
  TECH_INSIGHT_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
  DETAIL_POST_PAGE,
} from "@/constants/path";
import { useRouter } from "next/navigation";
import { POST_CATEGORY_VALUES } from "@/constants/admin";
import Link from "next/link";

const HistorySection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const { data } = useSWR("historyData", getHistoryData);

  const handleCategoryClick = (category: string) => {
    if (category === POST_CATEGORY_VALUES.INSIGHT)
      router.push(TECH_INSIGHT_PAGE);
    else if (category === POST_CATEGORY_VALUES.DOWNLOADS)
      router.push(DOWNLOADS_PAGE);
    else router.push(TECH_LIBRARY_PAGE);
  };

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
  if (!data || data.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-[80px] tablet:px-[30px] web:px-[120px] web:py-[100px]">
      <div className="flex flex-col  web:flex-row web:justify-between web:gap-x-[21%]">
        {/* 텍스트 영역 */}
        <div className="flex min-w-0 flex-col web:basis-[38%] web:justify-between">
          <h3 className="hidden web:block web:pretendard-display-1">
            이에이트의 <br />
            기술 이야기를
            <br />
            전합니다.
          </h3>

          {/* 캐러셀: tablet 이하에만 보이게 */}
          <div className="mb-[26px] w-full web:hidden">
            <CarouselBox
              setApi={setApi}
              items={data}
              onChange={(index) => setCurrent(index)}
            />
          </div>

          {/* 텍스트 본문 */}
          <div>
            <div className="mb-8 font-pretendard">
              <p className="mb-4 text-primary subtitle-s tablet:subtitle-m">
                {data[current].category}
              </p>
              <Link
                href={`${DETAIL_POST_PAGE}/${data[current].id}`}
                className="line-clamp-2 break-words leading-relaxed h2-r tablet:h2-l"
              >
                {data[current].title}
              </Link>
            </div>

            <Button
              size="lg"
              variant="outline"
              shape="round"
              className="hidden tablet:block"
              onClick={() => handleCategoryClick(data[current].category)}
            >
              더보기
            </Button>

            <Button
              size="md"
              variant="outline"
              shape="round"
              className="tablet:hidden"
              onClick={() => handleCategoryClick(data[current].category)}
            >
              더보기
            </Button>
          </div>
        </div>

        {/* 캐러셀: web 이상에만 보이게 */}
        <div className="hidden basis-[41%] web:block">
          <CarouselBox
            setApi={setApi}
            items={data}
            onChange={(index) => setCurrent(index)}
          />
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
