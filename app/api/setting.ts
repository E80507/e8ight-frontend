import { apiFetch } from "@/util/fetch";
import {
  ServiceNoticePatchReq,
  ServiceNoticePostReq,
  ServiceNoticeRes,
  ServiceNoticeStatusPostReq,
} from "./dto/setting";

// 서비스 공지 목록 조회
export const getServiceNoticeList = async (): Promise<
  () => ServiceNoticeRes[]
> => {
  try {
    const res = await apiFetch("/admin/announcements");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("서비스 공지 조회에 실패했습니다.");
  }
};

// 서비스 공지 상세 조회
export const getServiceNoticeDetail = async (
  id: string,
): Promise<() => ServiceNoticeRes> => {
  try {
    const res = await apiFetch(`/admin/announcements/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 조회에 실패했습니다.");
  }
};

// 서비스 공지 생성
export const postServiceNotice = async (
  data: ServiceNoticePostReq,
): Promise<() => ServiceNoticeRes> => {
  try {
    const res = await apiFetch(`/admin/announcements`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 생성에 실패했습니다.");
  }
};

// 서비스 공지 삭제
export const deleteServiceNotice = async (
  ids: string[],
): Promise<() => ServiceNoticeRes> => {
  try {
    const res = await apiFetch(`/admin/announcements`, {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 삭제 실패했습니다.");
  }
};

// 서비스 공지 상태 변경
export const patchServiceNoticeStatus = async (
  data: ServiceNoticeStatusPostReq,
): Promise<() => ServiceNoticeRes> => {
  try {
    const res = await apiFetch(`/admin/announcements/visibility`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 상태 변경에 실패했습니다.");
  }
};

// 서비스 공지 정보 변경
export const patchServiceNotice = async (
  id: string,
  data: ServiceNoticePatchReq,
): Promise<() => ServiceNoticeRes> => {
  try {
    const res = await apiFetch(`/admin/announcements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 변경에 실패했습니다.");
  }
};
