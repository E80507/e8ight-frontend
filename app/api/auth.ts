import { apiFetch } from "@/util/fetch";
import { LoginPostReq, PasswordChangePostReq, PostLogoutReq } from "./dto/auth";

// 로그인 요청
export const postLoggedIn = async (data: LoginPostReq) => {
  try {
    const res = await apiFetch(`/admin/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err: unknown) {
    console.error(err);
    throw new Error("로그인에 실패했습니다."); // 에러 다시 던지기
  }
};

// 로그아웃 요청
export const postLogout = async (data: PostLogoutReq) => {
  try {
    await apiFetch(`/admin/auth/logout`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
    throw new Error("로그아웃에 실패했습니다."); // 에러 다시 던지기
  }
};

// 비밀번호 변경 요청
export const postChangePassword = async (data: PasswordChangePostReq) => {
  try {
    await apiFetch(
      `/admin/auth/change-password`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      "json",
      false,
      true,
    );
    return;
  } catch (err: unknown) {
    throw err; // 에러 다시 던지기
  }
};
