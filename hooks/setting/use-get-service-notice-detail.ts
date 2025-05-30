import { ServiceNoticeRes } from "@/app/api/dto/setting";
import { getServiceNoticeDetail } from "@/app/api/setting";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 서비스 공지 상세 조회
export const useGetServiceNoticeDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => ServiceNoticeRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getServiceNoticeDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
