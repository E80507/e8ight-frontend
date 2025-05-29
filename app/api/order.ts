import { apiFetch } from "@/util/fetch";
import { OrderRes } from "./dto/order";

// 주문 출력 목록 조회
export const getOrderList = async (
  year: number,
  month: number,
  day: number,
): Promise<OrderRes[]> => {
  try {
    const res = await apiFetch(
      `/admin/deliveries/print?year=${year}&month=${month}&day=${day}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("주문 출력 목록 조회에 실패했습니다."); // 에러 다시 던지기
  }
};
