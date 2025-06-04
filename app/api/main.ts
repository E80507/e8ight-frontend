import { HistoryRes, SiumlationRes } from "./dto/main";
import { apiFetch } from "@/util/fetch";

// 기술 이야기 정보 조회
export const getHistoryData = async (): Promise<HistoryRes[]> => {
  try {
    const res = await apiFetch("/posts?page=1&limit=3&sortOrder=RANDOM");
    return res.posts;
  } catch (err) {
    console.error(err);
    throw new Error("캐러셀 조회에 실패했습니다.");
  }
};

// 캐러셀 정보 조회
export const getSimulationData = async (): Promise<SiumlationRes[]> => {
  try {
    const res = await apiFetch(
      "/posts?page=1&limit=9&category=DX&sortOrder=RANDOM",
    );
    return res.posts;
  } catch (err) {
    console.error(err);
    throw new Error("캐러셀 조회에 실패했습니다.");
  }
};
