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
import { useRef } from "react";
import { HistoryRes, SiumlationRes } from "../api/dto/main";

interface CarouselBoxProps {
  setApi: (api: CarouselApi) => void;
  items: HistoryRes[] | SiumlationRes[];
}

const CarouselBox = ({ setApi, items }: CarouselBoxProps) => {
  const autoplayRef = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className="flex size-full flex-col gap-y-[26px] web:gap-y-0"
      plugins={[autoplayRef.current]}
      autoplayRef={autoplayRef}
    >
      <div className="flex items-start justify-between gap-x-2 web:mb-6 web:flex-col">
        <h3 className="display-3 tablet:display-2 web:hidden web:display-1">
          이에이트의 <br />
          기술 이야기를
          <br />
          전합니다.
        </h3>
        <div className="flex gap-x-4 self-end">
          <CarouselPrevious className="border-none" />
          <CarouselNext className="border-none" />
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
