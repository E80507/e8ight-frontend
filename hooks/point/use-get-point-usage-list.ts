import {
  PointUsagePaginationReq,
  PointUsagePaginationRes,
} from "@/app/api/dto/point";
import { getPointUsageListWithPagination } from "@/app/api/point";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 포인트 사용 내역 조회
export const useGetPointUsageList = (req: PointUsagePaginationReq) => {
  const [result, setRes] = useState<{
    get: () => PointUsagePaginationRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getPointUsageListWithPagination(req));
    setRes(newRes);
  }, [
    req.page,
    req.keyword,
    req.purpose,
    req.usageStatus,
    req.startDate,
    req.endDate,
  ]);

  const data = result ? result.get() : null;

  return { data };
};
