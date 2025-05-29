import { NoticeRes } from "@/app/api/dto/notice";
import { getUserNoticeList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작가 회원 공지 목록 조회
export const useGetArtistNotice = (id: string) => {
  const [result, setRes] = useState<{
    get: () => NoticeRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserNoticeList(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
