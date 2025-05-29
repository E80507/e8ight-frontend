import { apiFetch } from "@/util/fetch";
import { NoticeDetailRes, NoticeRes } from "./dto/notice";

// 전체 공지 조회
export const getNoticeList = async (): Promise<() => NoticeRes[]> => {
  try {
    const res = await apiFetch("/admin/notices");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 조회에 실패했습니다.");
  }
};

// 공지 상세 조회
export const getNoticeDetail = async (
  noticeId: string,
): Promise<() => NoticeDetailRes> => {
  try {
    const res = await apiFetch(`/admin/notices/${noticeId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 조회에 실패했습니다.");
  }
};

// 작품 공개 여부 변경
export const patchNoticeStatus = async (noticeId: string) => {
  try {
    const res = await apiFetch(`/admin/notices/${noticeId}`, {
      method: "PATCH",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("공지 상세 정보 변경에 실패했습니다.");
  }
};
