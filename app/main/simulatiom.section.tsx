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

type Item = {
  createdAt: string;
  description: string;
  image: string;
};

const SimulationSection = () => {
  const router = useRouter();
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const items = [
    // 캐러셀 아이템 목데이터
    {
      createdAt: new Date().toISOString(),
      description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
      image: "/images/dummy-dashboard.webp",
    },
    {
      createdAt: new Date().toISOString(),
      description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
      image: "/images/dummy-dashboard.webp",
    },
    {
      createdAt: new Date().toISOString(),
      description: "이에이트에의 유튜브 영상을 빠르게 확인해보세요.",
      image: "/images/dummy-dashboard.webp",
    },
  ];
  const getItemsPerSlide = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1025) return 3; // 웹
    if (width >= 600) return 2; // 태블릿
    return 1; // 모바일
  };
  const [groupedItems, setGroupedItems] = useState<Item[][]>([]);

  useEffect(() => {
    const updateGroupedItems = () => {
      const count = getItemsPerSlide();
      const total = items.length;

      const grouped: typeof groupedItems = [];
      for (let i = 0; i < total; i += count) {
        let group = items.slice(i, i + count);

        // 마지막 그룹인데 갯수가 부족하면 앞에서부터 채움
        if (group.length < count) {
          group = [...group, ...items.slice(0, count - group.length)];
        }

        grouped.push(group);
      }

      setGroupedItems(grouped);
    };

    updateGroupedItems();
    window.addEventListener("resize", updateGroupedItems);
    return () => window.removeEventListener("resize", updateGroupedItems);
  }, []);

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
        <div className="relative px-4 pb-10 pt-[99px] text-white tablet:px-[30px] web:px-[120px]">
          <div className="relative flex flex-col gap-x-5">
            <div className="mb-5 flex flex-col gap-y-2 web:mb-0">
              <p className="pretendard-h1-r tablet:pretendard-h1-m web:pretendard-h1-l">
                DX Simulations
              </p>
              <p className="pretendard-subtitle-s tablet:pretendard-subtitle-m web:pretendard-subtitle-l">
                이에이트에의 유튜브 영상을 빠르게 확인해보세요.
              </p>
            </div>
            <div className="flex justify-between">
              <Button
                size="md"
                variant="outline"
                shape="round"
                className="border-transparent bg-white/40 text-white web:self-end"
                onClick={() => router.push("")} // 추후 외부 유투브 링크로 이동
              >
                더보기
              </Button>
              <div className="flex gap-x-4 self-end">
                <CarouselPrevious variant="none" className="text-white" />
                <CarouselNext variant="none" className="text-white" />
              </div>
            </div>
            <CarouselContent className="mt-[60px]">
              {groupedItems.map((slideItems, i) => (
                <CarouselItem key={i} className="basis-full pl-4 tablet:pl-6">
                  <div className="flex flex-col gap-y-4 tablet:flex-row">
                    {slideItems.map((item, index) => (
                      <div key={index} className="flex flex-col gap-y-4">
                        {/* 이미지 */}
                        <div className="relative aspect-[1.42] size-full tablet:aspect-[1.5] web:aspect-[1.05]">
                          <Image
                            src={item.image}
                            alt="DX Simulations"
                            fill
                            className="rounded-[20px] object-cover"
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
