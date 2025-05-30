interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export interface CarouselRes {
  carouselItems: CarouselItem[];
}
