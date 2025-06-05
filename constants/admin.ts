import { PostCategory } from "@/api/dto/post";

export const ADMIN_POST_CATEGORIES = [
  {
    text: "전체",
    value: "all",
  },
  {
    text: "Tech Library",
    value: "LIBRARY" as PostCategory,
  },
  {
    text: "Tech Insight",
    value: "INSIGHT" as PostCategory,
  },
  {
    text: "DX Simulation",
    value: "DX" as PostCategory,
  },
  {
    text: "Downloads",
    value: "DOWNLOADS" as PostCategory,
  },
];

export const POST_CATEGORY_VALUES = {
  LIBRARY: "LIBRARY",
  INSIGHT: "INSIGHT",
  DX: "DX",
  DOWNLOADS: "DOWNLOADS",
};

export const POST_CATEGORIES = [
  {
    label: "Tech Library",
    value: POST_CATEGORY_VALUES.LIBRARY,
  },
  {
    label: "Tech Insight",
    value: POST_CATEGORY_VALUES.INSIGHT,
  },
  {
    label: "DX Simulation",
    value: POST_CATEGORY_VALUES.DX,
  },
  {
    label: "Downloads",
    value: POST_CATEGORY_VALUES.DOWNLOADS,
  },
];
