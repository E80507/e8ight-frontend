"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import formattedDate from "@/util/date";
import { getSimulationData } from "../api/main";
import useSWR from "swr";
import { SiumlationRes } from "../api/dto/main";
import { useEffect, useState } from "react";
import Link from "next/link";

const SimulationSection = () => {
  const router = useRouter();
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const { data } = useSWR<SiumlationRes[]>("simluationData", getSimulationData);
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;
    api.reInit();
    api.selectedScrollSnap();

    const handleSelect = () => {
      api.selectedScrollSnap();
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);
  if (!data) return null;

  return (
    <section className="relative min-h-[389px]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 -z-10 h-[389px]">
        <Image
          src="/images/bg-simulation.webp"
          alt="DX Simulations"
          fill
          className="object-cover"
        />
      </div>

      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[autoplayRef.current]}
        autoplayRef={autoplayRef}
        setApi={setApi}
      >
        <div className="relative mx-auto w-full px-4 pb-10 pt-[99px] text-white tablet:px-[30px] web:px-[120px] web:py-[100px]">
          {/* 헤더 영역 */}
          <div className="mb-5 flex flex-col gap-y-2 web:mb-0">
            <p className="pretendard-h1-r tablet:pretendard-h1-m web:pretendard-h1-l">
              DX Simulations
            </p>
            <div className="items-center gap-x-5 web:flex web:justify-between">
              <div className="flex items-center gap-x-5">
                <p className="pretendard-subtitle-s tablet:pretendard-subtitle-m web:pretendard-subtitle-l">
                  이에이트에의 유튜브 영상을 빠르게 확인해보세요.
                </p>
                <Button
                  size="md"
                  variant="outline"
                  shape="round"
                  className="hidden border-transparent bg-white/40 text-white web:block"
                  onClick={() => router.push("")}
                >
                  더보기
                </Button>
              </div>
              <div className="hidden gap-x-4 web:flex">
                <CarouselPrevious
                  className="border-none bg-transparent"
                  svgColor="text-white"
                />
                <CarouselNext
                  className="border-none bg-transparent"
                  svgColor="text-white"
                />
              </div>
            </div>
          </div>

          {/* 모바일용 더보기/버튼 */}
          <div className="flex justify-between">
            <Button
              size="md"
              variant="outline"
              shape="round"
              className="border-transparent bg-white/40 text-white web:hidden"
              onClick={() => router.push("")}
            >
              더보기
            </Button>
            <div className="flex gap-x-4 self-end web:hidden">
              <CarouselPrevious
                className="border-none bg-transparent"
                svgColor="text-white"
              />
              <CarouselNext
                className="border-none bg-transparent"
                svgColor="text-white"
              />
            </div>
          </div>

          {/* 캐러셀 콘텐츠 */}
          <CarouselContent className="mx-auto mt-[60px] max-w-[1440px] gap-x-4 tablet:gap-x-6 tablet:pl-6 web:gap-x-0 web:pl-0">
            {data?.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-full !pl-0 tablet:basis-1/2 web:basis-1/3 web:!px-3"
              >
                <Link href={`${item.linkUrl}`} target="_blank">
                  <div className="flex flex-col gap-y-4">
                    {/* 이미지 */}
                    <div className="relative aspect-[1.42] size-full overflow-hidden tablet:aspect-[1.5] web:aspect-[1.52]">
                      <Image
                        src={item.thumbnail}
                        alt="DX Simulations"
                        fill
                        className="rounded-[20px] object-cover"
                        sizes="(max-width: 600px) 100vw, (max-width: 1025px) 50vw, 33vw"
                      />
                    </div>
                    {/* 텍스트 */}
                    <div className="px-3">
                      <p className="text-label-natural pretendard-body-2">
                        {formattedDate(item.createdAt, "INPUT_DATE")}
                      </p>
                      <p className="break-keep font-pretendard text-black h2-l">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};

export default SimulationSection;
