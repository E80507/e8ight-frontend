import {
  PointChargePaginationReq,
  PointChargePaginationRes,
} from "@/app/api/dto/point";
import { getPointChargeListWithPagination } from "@/app/api/point";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 포인트 충전 내역 조회
export const useGetPointChargeList = (req: PointChargePaginationReq) => {
  const [result, setRes] = useState<{
    get: () => PointChargePaginationRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getPointChargeListWithPagination(req));
    setRes(newRes);
  }, [req.page, req.keyword, req.rechargeStatus, req.startDate, req.endDate]);

  const data = result ? result.get() : null;

  return { data };
};
