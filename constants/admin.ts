import { PostCategory } from "@/app/api/dto/post";

export const ADMIN_POST_CATEGORIES = [
  {
    text: "전체",
    value: "all",
  },
  {
    text: "Tech Library",
    value: "Tech Library" as PostCategory,
  },
  {
    text: "Tech Insight",
    value: "Tech Insight" as PostCategory,
  },
  {
    text: "DX Simulation",
    value: "DX" as PostCategory,
  },
  {
    text: "Downloads",
    value: "Downloads" as PostCategory,
  },
];

export const POST_CATEGORY_VALUES = {
  LIBRARY: "Tech Library",
  INSIGHT: "Tech Insight",
  DX: "DX",
  DOWNLOADS: "Downloads",
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
