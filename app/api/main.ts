import { CarouselRes } from "./dto/main";
import { apiFetch } from "@/util/fetch";

// 캐러셀 정보 조회
export const getHistoryData = async (): Promise<CarouselRes[]> => {
  try {
    const res = await apiFetch("/posts?page=1&limit=3&sortOrder=RANDOM");
    return res.posts;
  } catch (err) {
    console.error(err);
    throw new Error("캐러셀 조회에 실패했습니다.");
  }
};
