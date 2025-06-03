import { AdminCategory } from "@/app/api/dto/admin";
import { PostCategory } from "@/api/dto/post";

export const POST_CATEGORIES = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "Tech Library",
    value: "LIBRARY" as PostCategory,
  },
  {
    label: "Tech Insight",
    value: "INSIGHT" as PostCategory,
  },
  {
    label: "DX Simulation",
    value: "DX" as PostCategory,
  },
  {
    label: "Downloads",
    value: "DOWNLOADS" as PostCategory,
  },
];
