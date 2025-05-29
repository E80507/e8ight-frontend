import { PointChargeRes } from "@/app/api/dto/point";
import { getPointChargeDetail } from "@/app/api/point";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 포인트 충전 상세 조회
export const useGetPointChargeDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => PointChargeRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getPointChargeDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
