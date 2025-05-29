import { PointUsageRes } from "@/app/api/dto/point";
import { getPointUsageDetail } from "@/app/api/point";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 포인트 사용 내역 상세 조회
export const useGetPointUsageDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => PointUsageRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getPointUsageDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
