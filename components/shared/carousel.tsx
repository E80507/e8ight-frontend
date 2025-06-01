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

interface CarouselBoxProps {
  setApi: (api: CarouselApi) => void;
  items: {
    category: string;
    title: string;
    description: string;
  }[];
}

const CarouselBox = ({ setApi, items }: CarouselBoxProps) => (
  <Carousel
    opts={{ loop: true }}
    setApi={setApi}
    className="flex aspect-[7/8] w-full flex-col  gap-y-[26px] web:w-[calc(100%-384px)] web:min-w-[379px] web:max-w-[482px] web:gap-y-6"
    plugins={[
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]}
  >
    <div className="flex items-start justify-between gap-x-2 web:flex-col">
      <div className="flex items-start gap-x-2 web:hidden">
        <div className="size-2 rounded-full bg-primary web:size-4" />
        <h3 className="display-3 tablet:display-2 web:display-1">
          이에이트의 <br />
          기술 이야기를
          <br />
          전합니다.
        </h3>
      </div>
      <div className="flex gap-x-4 self-end">
        <CarouselPrevious className="border-none" />
        <CarouselNext className="border-none" />
      </div>
    </div>
    <CarouselContent>
      {items.map((_, i) => (
        <CarouselItem key={i} className="w-full flex-none">
          <div className="relative aspect-[7/8] w-full overflow-hidden rounded-[20px]">
            <Image
              src="/images/history.webp"
              alt="이미지"
              fill
              className="object-cover"
              sizes="(max-width:600px) 100vw, (max-width: 1025px) 50vw, 33vw"
              priority
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);

export default CarouselBox;
