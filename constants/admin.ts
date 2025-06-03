import { AdminCategory } from "@/app/api/dto/admin";
import { PostCategory } from "@/api/dto/post";

export const POST_CATEGORIES = [
  {
    text: "전체",
    value: "",
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
