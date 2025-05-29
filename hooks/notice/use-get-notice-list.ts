import { NoticeRes } from "@/app/api/dto/notice";
import { getNoticeList } from "@/app/api/notice";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 공지 조회
export const useGetNoticeList = () => {
  const [result, setRes] = useState<{
    get: () => NoticeRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getNoticeList());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
