import { apiFetch } from "@/util/fetch";
import { PatchReportStatus, ReportRes } from "./dto/report";

// 전체 신고 목록 조회
export const getReportList = async (): Promise<() => ReportRes[]> => {
  try {
    const res = await apiFetch("/admin/reports");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("신고 목록 조회에 실패했습니다.");
  }
};

// 신고 상세 조회
export const getReportDetail = async (
  reportId: string,
): Promise<() => ReportRes> => {
  try {
    const res = await apiFetch(`/admin/reports/${reportId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 조회에 실패했습니다.");
  }
};

// 신고 상태 변경
export const patchReportStatus = async (
  reportId: string,
  data: PatchReportStatus,
): Promise<() => ReportRes> => {
  try {
    const res = await apiFetch(`/admin/reports/${reportId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("신고 상태 변경에 실패했습니다.");
  }
};
