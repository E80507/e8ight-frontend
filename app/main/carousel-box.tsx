import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { HistoryRes, SiumlationRes } from "../api/dto/main";

interface CarouselBoxProps {
  items: HistoryRes[] | SiumlationRes[];
  onChange?: (index: number) => void;
  setApi: (api: CarouselApi) => void;
}

const CarouselBox = ({ items, onChange, setApi }: CarouselBoxProps) => {
  const [localApi, setLocalApi] = useState<CarouselApi | null>(null);
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  useEffect(() => {
    if (!localApi) return;

    setApi(localApi); // 부모로도 전달

    const handleSelect = () => {
      const index = localApi.selectedScrollSnap();
      onChange?.(index);
    };

    localApi.on("select", handleSelect);

    return () => {
      localApi.off("select", handleSelect);
    };
  }, [localApi, onChange, setApi]);

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setLocalApi}
      className="flex size-full flex-col gap-y-[26px] web:gap-y-0"
      plugins={[autoplayRef.current]}
      autoplayRef={autoplayRef}
    >
      <div className="flex items-start justify-between gap-x-2 web:mb-6 web:flex-col">
        <h3 className="pretendard-display-3 tablet:pretendard-display-2 web:hidden">
          이에이트의 <br />
          기술 이야기를
          <br />
          전합니다.
        </h3>
        <div className="flex gap-x-4 self-end">
          <CarouselPrevious
            className="border-none bg-transparent"
            svgColor="text-black"
          />
          <CarouselNext
            className="border-none bg-transparent"
            svgColor="text-black"
          />
        </div>
      </div>
      <CarouselContent className="flex-1">
        {items.map((item, i) => (
          <CarouselItem key={i}>
            <div className="relative aspect-[7/8] size-full overflow-hidden rounded-[20px]">
              <Image
                src={item.thumbnail ?? "/images/main/default-thumbnail.png"}
                alt="이미지"
                fill
                className="object-cover"
                sizes="(max-width:600px) 100vw, (max-width: 1025px) 50vw, 33vw h-full"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export default CarouselBox;
