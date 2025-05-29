import { ReportResolution } from "@/app/api/dto/report";

// 신고 상태
export const REPORT_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "접수",
    value: "false",
  },
  {
    label: "처리",
    value: "true",
  },
];

// 신고 노출 상태
export const REPORT_EXPOSE_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "비공개",
    value: ReportResolution.HIDE,
  },
  {
    label: "해당 없음",
    value: ReportResolution.NOT_APPLICABLE,
  },
];
