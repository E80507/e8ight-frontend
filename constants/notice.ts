import { NoticeStatus } from "@/app/api/dto/notice";

// 공지 상태
export const NOTICE_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "게시",
    value: NoticeStatus.ACTIVE,
  },
  {
    label: "삭제",
    value: NoticeStatus.DELETED,
  },
];

// 처리 상태
export const NOTICE_EXPOSURE_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "공개",
    value: "false", // isBlocked
  },
  {
    label: "비공개",
    value: "true", // isBlocked
  },
];
