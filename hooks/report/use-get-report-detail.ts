import { ReportRes } from "@/app/api/dto/report";
import { getReportDetail } from "@/app/api/report";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 신고 상세 조회
export const useGetReportDetail = (reportId: string) => {
  const [result, setRes] = useState<{
    get: () => ReportRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getReportDetail(reportId));
    setRes(newRes);
  }, [reportId]);

  const data = result ? result.get() : null;

  return { data };
};
