import { apiFetch } from "@/util/fetch";
import { NoticeRes } from "./dto/notice";
import {
  PointChargeRes,
  PointUsageRes,
  PointChargeStatus,
  PointChargePaginationReq,
  PointChargePaginationRes,
  PointUsagePaginationReq,
  PointUsagePaginationRes,
  PointUsageTransactionType,
  PointChargeSalesRes,
} from "./dto/point";

// 전체 포인트 충전 내역 조회
export const getPointChargeList = async (): Promise<() => NoticeRes[]> => {
  try {
    const res = await apiFetch("/admin/points/history/recharge");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 충전 내역 조회에 실패했습니다.");
  }
};

// 포인트 충전 내역 페이징 조회
export const getPointChargeListWithPagination = async (
  req: PointChargePaginationReq,
): Promise<() => PointChargePaginationRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (req.page) params.push(`page=${req.page}`);
  if (req.limit) params.push(`limit=${req.limit}`);
  if (req.keyword) params.push(`keyword=${req.keyword}`);
  if (req.rechargeStatus && req.rechargeStatus !== PointChargeStatus.ALL)
    params.push(`rechargeStatus=${req.rechargeStatus}`);
  if (req.startDate) params.push(`startDate=${req.startDate}`);
  if (req.endDate) params.push(`endDate=${req.endDate}`);

  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  try {
    const res = await apiFetch(
      `/admin/points/history/recharge/pagination${queryString}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 충전 내역 조회에 실패했습니다.");
  }
};

// 포인트 충전 상세 조회
export const getPointChargeDetail = async (
  id: string,
): Promise<() => PointChargeRes> => {
  try {
    const res = await apiFetch(`/admin/points/history/recharge/detail/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 충전 내역 조회에 실패했습니다.");
  }
};

// 포인트 사용 내역 조회
export const getPointUsageList = async (): Promise<() => PointUsageRes[]> => {
  try {
    const res = await apiFetch(`/admin/points/history/usage`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 사용 내역 조회에 실패했습니다.");
  }
};

// 포인트 사용 내역 페이징 조회
export const getPointUsageListWithPagination = async (
  req: PointUsagePaginationReq,
): Promise<() => PointUsagePaginationRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (req.page) params.push(`page=${req.page}`);
  if (req.limit) params.push(`limit=${req.limit}`);
  if (req.keyword) params.push(`keyword=${req.keyword}`);
  if (req.purpose && req.purpose !== PointUsageTransactionType.ALL)
    params.push(`purpose=${req.purpose}`);
  if (req.usageStatus && req.usageStatus !== PointChargeStatus.ALL)
    params.push(`usageStatus=${req.usageStatus}`);
  if (req.startDate) params.push(`startDate=${req.startDate}`);
  if (req.endDate) params.push(`endDate=${req.endDate}`);
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  try {
    const res = await apiFetch(
      `/admin/points/history/usage/pagination${queryString}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 사용 내역 조회에 실패했습니다.");
  }
};
// 포인트 사용 내역 상세 조회
export const getPointUsageDetail = async (
  id: string,
): Promise<() => PointUsageRes> => {
  try {
    const res = await apiFetch(`/admin/points/history/usage/detail/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 사용 내역 조회에 실패했습니다.");
  }
};

// 포인트 충전 내역 매출 조회
export const getPointChargeSalesList = async (
  startDate: string,
  endDate: string,
): Promise<() => PointChargeSalesRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (startDate) params.push(`startDate=${startDate}`);
  if (endDate) params.push(`endDate=${endDate}`);
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  try {
    const res = await apiFetch(
      `/admin/points/history/recharge/sales${queryString}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 충전 내역 매출 조회에 실패했습니다.");
  }
};
