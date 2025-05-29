import { ArtworkStatus } from "@/app/api/dto/artwork";

// 작품 상태
export const ARTWORK_STATUS_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "진행",
    value: ArtworkStatus.ACTIVE,
  },
  {
    label: "만료",
    value: ArtworkStatus.EXPIRED,
  },
  {
    label: "삭제",
    value: ArtworkStatus.DELETED,
  },
];

// 작품 노출 상태
export const ARTWORK_EXPOSE_STATUS_ARRAY = [
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
