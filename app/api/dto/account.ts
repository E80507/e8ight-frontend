import { AdminRole } from "./auth";

export interface AccountRes {
  id: string; // id
  createdAt: string; // 생성일자
  lastLoginAt: string; // 마지막 로그인 일자
  loginId: string; // 로그인 아이디
  role: AdminRole; // 계정 유형
  name: string; // 관리자 이름
}

export interface AccountPostReq {
  loginId: string; // 로그인 아이디
  role: AdminRole; // 계정 유형
  name: string; // 관리자 이름
}
