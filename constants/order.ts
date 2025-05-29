import { ArtworkCategory } from "@/app/api/dto/artwork";

// 작품 유형
export const ARTWORK_TYPE_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "엽서 (102x152mm) / 유광 (반광택)",
    value: ArtworkCategory.PHOTO,
  },
  {
    label: "엽서 (102x152mm) / 무광 (프리미엄 매트)",
    value: ArtworkCategory.CARD,
  },
  {
    label: "엽서 (102x152mm) / 유광 (고광택 + 점착)",
    value: ArtworkCategory.STICKER,
  },
  // {
  //   label: "엽서 (102x152mm) / 유광 (반광택 + 펄)",
  //   value: ArtworkCategory.POSTCARD_SEMI_GLOSS_PEARL,
  // },
  // {
  //   label: "미니포스터 (152x203mm) / 유광 (반광택)",
  //   value: ArtworkCategory.MINI_POSTER_SEMI_GLOSS,
  // },
  // {
  //   label: "미니포스터 (152x203mm) / 유광 (반광택 + 펄)",
  //   value: ArtworkCategory.MINI_POSTER_SEMI_GLOSS_PEARL,
  // },
  // {
  ////   label: "미니포스터 (152x203mm) / 유광 (고광택)",
  ////   value: ArtworkCategory.MINI_POSTER_HIGH_GLOSS,
  //// },
  // {
  //   label: "포스터 (210x297mm) / 유광 (반광택)",
  //   value: ArtworkCategory.POSTER_SEMI_GLOSS,
  // },
  //// {
  ////   label: "포스터 (210x297mm) / 유광 (반광택 + 펄)",
  ////   value: ArtworkCategory.POSTER_SEMI_GLOSS_PEARL,
  // },
  // {
  //   label: "포스터 (210x297mm) / 유광 (고광택)",
  //   value: ArtworkCategory.POSTER_HIGH_GLOSS,
  // },
];
