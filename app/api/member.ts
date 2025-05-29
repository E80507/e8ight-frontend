import { apiFetch } from "@/util/fetch";
import {
  MemberRes,
  MemberPaginationReq,
  MemberPaginationRes,
  PatchUserInfoReq,
  UserDetailRes,
} from "./dto/member";
import { PointChargeRes, PointUsageRes } from "./dto/point";
import { DeliveryRes } from "./dto/delivery";
import { ReportRes } from "./dto/report";
import { ArtworkRes } from "./dto/artwork";
import { ProfitRes } from "./dto/profit";
import { MemberStatus, UserType } from "./dto/member";
// 전체 회원 조회
export const getMemberList = async (): Promise<() => MemberRes[]> => {
  try {
    const res = await apiFetch("/admin/users");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원 정보 조회에 실패했습니다.");
  }
};

// 회원 목록 조회(페이지네이션)
export const getMemberListWithPagination = async (
  req: MemberPaginationReq,
): Promise<() => MemberPaginationRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (req.page) params.push(`page=${req.page}`);
  if (req.limit) params.push(`limit=${req.limit}`);
  if (req.keyword) params.push(`keyword=${req.keyword}`);
  if (req.userType && req.userType !== UserType.ALL)
    params.push(`userType=${req.userType}`);
  if (req.userStatus && req.userStatus !== MemberStatus.ALL)
    params.push(`userStatus=${req.userStatus}`);
  if (req.startDate) params.push(`startDate=${req.startDate}`);
  if (req.endDate) params.push(`endDate=${req.endDate}`);

  // 파라미터를 쿼리 문자열로 변환
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";

  try {
    const res = await apiFetch(`/admin/users/pagination${queryString}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원 목록 조회에 실패했습니다.");
  }
};

// 일반 유저 상세 정보 조회
export const getUserDetailInfo = async (
  userId: string,
  isArtist: boolean,
): Promise<() => UserDetailRes> => {
  try {
    const res = await apiFetch(`/admin/users/${userId}?isArtist=${isArtist}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("회원 상세 정보 조회에 실패했습니다.");
  }
};

// 일반 유저의 포인트 충전 내역 조회
export const getUserPointChargeList = async (
  userId: string,
): Promise<() => PointChargeRes[]> => {
  try {
    const res = await apiFetch(`/admin/points/history/recharge/${userId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 충전 내역 조회에 실패했습니다.");
  }
};

// 일반 유저의 포인트 사용 내역 조회
export const getUserPointUseList = async (
  userId: string,
): Promise<() => PointUsageRes[]> => {
  try {
    const res = await apiFetch(`/admin/points/history/usage/${userId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포인트 사용 내역 조회에 실패했습니다.");
  }
};

// 일반 유저의 주문 내역(배송 내역) 조회
export const getUserDeliveryList = async (
  userId: string,
): Promise<() => DeliveryRes[]> => {
  try {
    const res = await apiFetch(`/admin/deliveries/user/${userId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("주문 내역 조회에 실패했습니다.");
  }
};

// 유저의 신고 내역 조회
export const getUserReportList = async (
  userId: string,
  isArtist: boolean,
): Promise<() => ReportRes[]> => {
  try {
    const endPoint = isArtist
      ? `/admin/reports/artist/${userId}`
      : `/admin/reports/user/${userId}`;
    const res = await apiFetch(endPoint);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("신고 내역 조회에 실패했습니다.");
  }
};

// 회원 정보 변경
export const patchUserInfo = async (
  userId: string,
  isArtist: boolean,
  data: PatchUserInfoReq,
) => {
  try {
    await apiFetch(`/admin/users/${userId}?isArtist=${isArtist}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("회원 정보 변경에 실패했습니다.");
  }
};

// 작가 회원 작품 목록 조회
export const getUserArtworkList = async (
  userId: string,
): Promise<() => ArtworkRes[]> => {
  try {
    const res = await apiFetch(`/admin/artworks/artist/${userId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("작품 목록 조회에 실패했습니다.");
  }
};

// 작가 회원 공지 목록 조회
export const getUserNoticeList = async (
  artistId: string,
): Promise<() => ArtworkRes[]> => {
  try {
    const res = await apiFetch(`/admin/notices/artist/${artistId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 목록 조회에 실패했습니다.");
  }
};

// 작가 회원 수익 목록 조회
export const getUserProfitList = async (
  userId: string,
): Promise<() => ProfitRes[]> => {
  try {
    const res = await apiFetch(`/admin/revenues/${userId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("수익 목록 조회에 실패했습니다.");
  }
};
