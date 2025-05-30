import { ServiceNoticeRes } from "@/app/api/dto/setting";
import { getServiceNoticeList } from "@/app/api/setting";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 서비스 공지 목록 조회
export const useGetServiceNoticeList = () => {
  const [result, setRes] = useState<{
    get: () => ServiceNoticeRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getServiceNoticeList());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
