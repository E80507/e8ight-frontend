import { apiFetch } from "@/util/fetch";
import { AccountPostReq, AccountRes } from "./dto/account";

// 관리자 계정 목록 조회
export const getAccountList = async (): Promise<() => AccountRes[]> => {
  try {
    const res = await apiFetch("/admin/admins");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 목록 조회에 실패했습니다.");
  }
};

// 관리자 계정 상세 조회
export const getAccountDetail = async (
  id: string,
): Promise<() => AccountRes> => {
  try {
    const res = await apiFetch(`/admin/admins/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 상세 조회에 실패했습니다.");
  }
};

// 관리자 계정 생성
export const postAccount = async (data: AccountPostReq) => {
  try {
    const res = await apiFetch(`/admin/admins`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 생성에 실패했습니다.");
  }
};

// 관리자 계정 비밀번호 초기화
export const patchAccountPassword = async (id: string) => {
  try {
    const res = await apiFetch(`/admin/admins/${id}/reset-password`, {
      method: "PATCH",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 비밀번호 초기화에 실패했습니다.");
  }
};

// 관리자 계정 삭제
export const deleteAccount = async (id: string) => {
  try {
    const res = await apiFetch(`/admin/admins/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("관리자 계정 삭제에 실패했습니다.");
  }
};
