import { MemberStatus, UserType } from "@/app/api/dto/member";

// 회원 유형
export const MEMBER_TYPE_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "일반",
    value: UserType.USER,
  },
  {
    label: "작가",
    value: UserType.ARTIST,
  },
];

// 회원 상태
export const MEMBER_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "정상",
    value: MemberStatus.ACTIVE,
  },
  {
    label: "차단",
    value: MemberStatus.BLOCKED,
  },
  {
    label: "탈퇴",
    value: MemberStatus.DELETED,
  },
];
