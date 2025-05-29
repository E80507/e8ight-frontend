export interface LoginPostReq {
  loginId: string;
  password: string;
}

// 관리자 계정 유형
export enum AdminRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface Admin {
  id: string;
  name: string | null;
  loginId: string;
  isPasswordChangeRequired: boolean; // 비밀번호 변경 필요 여부
  role: AdminRole;
}
export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  admin: Admin;
}

// 비밀번호 변경 요청
export interface PasswordChangePostReq {
  password: string; // 현재 비밀번호
  newPassword: string; // 새 비밀번호
  newPasswordConfirm: string; // 확인된 새 비밀번호
}

export interface PostLogoutReq {
  refreshToken: string | undefined; // 리프레쉬 토큰
}
