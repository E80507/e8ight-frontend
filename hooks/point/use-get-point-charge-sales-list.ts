import { PointChargeSalesRes } from "@/app/api/dto/point";
import { getPointChargeSalesList } from "@/app/api/point";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 포인트 충전 내역 매출 조회
export const useGetPointChargeSalesList = (
  startDate: string,
  endDate: string,
) => {
  const [result, setRes] = useState<{
    get: () => PointChargeSalesRes | null;
  } | null>(null);
  const [totalSales, setTotalSales] = useState<number>(0);

  useEffect(() => {
    const newRes = wrapPromise(getPointChargeSalesList(startDate, endDate));
    setRes(newRes);
  }, [startDate, endDate]);

  useEffect(() => {
    const data = result?.get();
    if (data) {
      setTotalSales(data.totalSales);
    }
  }, [result]);

  const data = result ? result.get() : null;

  return { data, totalSales };
};
