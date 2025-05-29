import { OrderRes } from "@/app/api/dto/order";
import { getOrderList } from "@/app/api/order";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 주문 출력 목록 조회
export const useGetOrderList = (year: number, month: number, day: number) => {
  const [result, setRes] = useState<{
    get: () => OrderRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getOrderList(year, month, day));
    setRes(newRes);
  }, [year, month, day]);

  const data = result ? result.get() : null;

  return { data };
};
