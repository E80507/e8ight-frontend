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
    className="web:w-[calc(100%-384px)] web:min-w-[379px] web:max-w-[482px] web:gap-y-6  flex aspect-[7/8] w-full flex-col gap-y-[26px]"
    plugins={[
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]}
  >
    <div className="web:flex-col flex items-start justify-between gap-x-2">
      <div className="web:hidden flex items-start gap-x-2">
        <div className="bg-primary web:size-4 size-2 rounded-full" />
        <h3 className="mobile:display-3 tablet:display-2 web:display-1">
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
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
);

export default CarouselBox;
