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
