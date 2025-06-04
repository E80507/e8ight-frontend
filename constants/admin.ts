import { AdminCategory } from "@/app/api/dto/admin";
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
