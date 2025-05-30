import { CarouselRes } from "./dto/main";
import { apiFetch } from "@/util/fetch";

// 캐러셀 정보 조회
export const getCarouselData = async (): Promise<() => CarouselRes[]> => {
  try {
    const res = await apiFetch(""); // 수정 필요
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("캐러셀 조회에 실패했습니다.");
  }
};
