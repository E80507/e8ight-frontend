import { DeliveryRes } from "@/app/api/dto/delivery";
import { getUserDeliveryList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 일반 회원의 배송 내역 조회
export const useGetUserDeliveryList = (id: string) => {
  const [result, setRes] = useState<{
    get: () => DeliveryRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserDeliveryList(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
