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

export const POST_CATEGORIES = [
  {
    value: "Tech Library",
    text: AdminCategory.LIBRARY,
  },
  {
    value: "Tech Insight",
    text: AdminCategory.INSIGHT,
  },
  {
    value: "DX Simulation",
    text: AdminCategory.DX,
  },
  {
    value: "Downloads",
    text: AdminCategory.DOWNLOADS,
  },
];
