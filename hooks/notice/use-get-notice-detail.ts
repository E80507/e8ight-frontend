import { NoticeDetailRes } from "@/app/api/dto/notice";
import { getNoticeDetail } from "@/app/api/notice";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 공지 상세 조회
export const useGetNoticeDetail = (noticeId: string) => {
  const [result, setRes] = useState<{
    get: () => NoticeDetailRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getNoticeDetail(noticeId));
    setRes(newRes);
  }, [noticeId]);

  const data = result ? result.get() : null;

  return { data };
};
