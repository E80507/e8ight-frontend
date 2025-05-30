import { CarouselRes } from "@/app/api/dto/main";
import { getCarouselData } from "@/app/api/main";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 캐러셀 데이터 조회
export const useGetCarouselData = () => {
  const [result, setRes] = useState<{
    get: () => CarouselRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getCarouselData());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
