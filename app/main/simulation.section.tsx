import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import formattedDate from "@/util/date";
import { getSimulationData } from "../api/main";
import useSWR from "swr";
import { SiumlationRes } from "../api/dto/main";

const SimulationSection = () => {
  const router = useRouter();
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );
  const { data } = useSWR<SiumlationRes[]>("simluationData", () =>
    getSimulationData(),
  );

  // const items = [
  //   // 캐러셀 아이템 목데이터
  //   {
  //     createdAt: new Date().toISOString(),
  //     description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
  //     thumbnail: "/images/dummy-dashboard.webp",
  //   },
  //   {
  //     createdAt: new Date().toISOString(),
  //     description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
  //     thumbnail: "/images/dummy-dashboard.webp",
  //   },
  //   {
  //     createdAt: new Date().toISOString(),
  //     description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
  //     thumbnail: "/images/dummy-dashboard.webp",
  //   },
  //   {
  //     createdAt: new Date().toISOString(),
  //     description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
  //     thumbnail: "/images/dummy-dashboard.webp",
  //   },
  //   {
  //     createdAt: new Date().toISOString(),
  //     description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
  //     thumbnail: "/images/dummy-dashboard.webp",
  //   },
  // ];

  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1025) return 3; // 웹
    if (width >= 600) return 2; // 태블릿
    return 1; // 모바일
  };
  const [groupedItems, setGroupedItems] = useState<SiumlationRes[][]>([]);

  useEffect(() => {
    const updateGroupedItems = () => {
      if (!data) return;
      const count = getItemsPerSlide();
      const total = data.length;

      const grouped: typeof groupedItems = [];
      for (let i = 0; i < total; i += count) {
        let group = data.slice(i, i + count);

        // 마지막 그룹인데 갯수가 부족하면 앞에서부터 채움
        if (group.length < count) {
          group = [...group, ...data.slice(0, count - group.length)];
        }

        grouped.push(group);
      }

      setGroupedItems(grouped);
    };

    updateGroupedItems();
    window.addEventListener("resize", updateGroupedItems);
    return () => window.removeEventListener("resize", updateGroupedItems);
  }, [data]);

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 h-[389px]">
        <Image
          src="/images/bg-simulation.webp"
          alt="DX Simulations"
          fill
          className="object-cover"
        />
      </div>

      <Carousel opts={{ loop: true }} plugins={[autoplayRef.current]}>
        <div className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-[99px] text-white tablet:px-[30px] web:px-[120px]">
          <div className="relative flex flex-col gap-x-5">
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
                    onClick={() => router.push("")} // 추후 외부 유투브 링크로 이동
                  >
                    더보기
                  </Button>
                </div>
                <div className="hidden gap-x-4 web:flex">
                  <CarouselPrevious className="border-none bg-transparent text-white" />
                  <CarouselNext className="border-none bg-transparent text-white" />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                size="md"
                variant="outline"
                shape="round"
                className="border-transparent bg-white/40 text-white web:hidden"
                onClick={() => router.push("")} // 추후 외부 유투브 링크로 이동
              >
                더보기
              </Button>
              <div className="flex gap-x-4 self-end web:hidden">
                <CarouselPrevious className="border-none bg-transparent text-white" />
                <CarouselNext className="border-none bg-transparent text-white" />
              </div>
            </div>
            <CarouselContent className="mx-auto mt-[60px] max-w-[1440px] overflow-hidden">
              {groupedItems.map((slideItems, i) => (
                <CarouselItem key={i} className="basis-full">
                  <div className="grid grid-cols-1 gap-y-4 tablet:grid-cols-2 tablet:gap-x-6 web:grid-cols-3">
                    {slideItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-y-4 tablet:flex-1"
                      >
                        {/* 이미지 */}
                        <div className="relative aspect-[1.42] size-full overflow-hidden tablet:aspect-[1.5] web:aspect-[1.05]">
                          <Image
                            src={item.thumbnail}
                            alt="DX Simulations"
                            fill
                            className="rounded-[20px] object-contain"
                            sizes="(max-width: 600px) 100vw, (max-width: 1025px) 50vw, 33vw"
                          />
                        </div>
                        {/* 텍스트 */}
                        <div className="px-3">
                          <p className="text-label-natural pretendard-body-2">
                            {formattedDate(item.createdAt, "INPUT_DATE")}
                          </p>
                          <p className="break-keep font-pretendard text-black h2-l">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default SimulationSection;
