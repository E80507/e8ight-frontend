import { PointChargeRes } from "@/app/api/dto/point";
import { getUserPointChargeList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 일반 회원의 포인트 충전 내역 조회
export const useGetUserPointChargeList = (id: string) => {
  const [result, setRes] = useState<{
    get: () => PointChargeRes[] | null;
  } | null>(null);

  const fetchUserPointChargeList = (id: string) => {
    const newRes = wrapPromise(getUserPointChargeList(id));
    setRes(newRes);
  };

  useEffect(() => {
    fetchUserPointChargeList(id);
  }, [id]);

  const data = result ? result.get() : null;

  return { data, fetchUserPointChargeList };
};
