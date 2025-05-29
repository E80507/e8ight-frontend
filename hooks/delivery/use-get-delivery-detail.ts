import { getDeliveryDetail } from "@/app/api/delivery";
import { DeliveryDetailRes } from "@/app/api/dto/delivery";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 배송 목록 상세 조회
export const useGetDeliveryDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => DeliveryDetailRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getDeliveryDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
