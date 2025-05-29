import {
  DeliveryPaginationReq,
  DeliveryPaginationRes,
} from "@/app/api/dto/delivery";
import { getDeliveryListWithPagination } from "@/app/api/delivery";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 배송 목록 조회
export const useGetDeliveryList = (req: DeliveryPaginationReq) => {
  const [result, setRes] = useState<{
    get: () => DeliveryPaginationRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getDeliveryListWithPagination(req));
    setRes(newRes);
  }, [
    req.page,
    req.limit,
    req.keyword,
    req.deliveryStatus,
    req.printStatus,
    req.startDate,
    req.endDate,
  ]);

  const data = result ? result.get() : null;

  return { data };
};
