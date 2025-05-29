import { PointUsageRes } from "@/app/api/dto/point";
import { getUserPointUseList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 일반 회원의 포인트 사용 내역 조회
export const useGetUserPointUseList = (id: string) => {
  const [result, setRes] = useState<{
    get: () => PointUsageRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserPointUseList(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
