import { AdminCategory } from "@/app/api/dto/admin";

export const ADMIN_CATEGORY_ARRAY = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "Tech Library",
    value: AdminCategory.LIBRARY,
  },
  {
    label: "Tech Insight",
    value: AdminCategory.INSIGHT,
  },
  {
    label: "DX Simulation",
    value: AdminCategory.DX,
  },
  {
    label: "Downloads",
    value: AdminCategory.DOWNLOADS,
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
