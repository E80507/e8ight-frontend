import { ReportRes } from "@/app/api/dto/report";
import { getReportList } from "@/app/api/report";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 신고 목록 조회
export const useGetReportList = () => {
  const [result, setRes] = useState<{
    get: () => ReportRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getReportList());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
