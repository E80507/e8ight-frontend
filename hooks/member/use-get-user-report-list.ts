import { ReportRes } from "@/app/api/dto/report";
import { getUserReportList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 일반 회원의 신고 내역 조회
export const useGetUserReportList = (id: string, isArtist: boolean) => {
  const [result, setRes] = useState<{
    get: () => ReportRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserReportList(id, isArtist));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
