import { AdminCategory } from "@/app/api/dto/admin";
import { PostCategory } from "@/app/api/dto/post";

// 닉네임 마스킹 처리 함수
export const handleMaskName = (name: string, isName?: boolean): string => {
  // 이름일 경우
  if (isName) {
    if (name.length === 1) return name;
    if (name.length === 2) {
      return name.slice(0, 1) + "*";
    } else {
      return name.slice(0, 1) + "*".repeat(name.length - 2) + name.slice(-1);
    }
  }

  if (name.length === 1) {
    return name;
  }
  if (name.length < 4) {
    return name.slice(0, 1) + "*".repeat(name.length - 1);
  } else {
    return name.slice(0, 3) + "*".repeat(name.length - 3);
  }
};

// 이메일 마스킹 처리 함수
export const handleMaskEmail = (email: string): string => {
  const id = email.split("@")[0];
  const domain = email.split("@")[1];
  let maskedId; // 마스킹 처리 된 id

  if (id.length < 4) {
    maskedId = id.slice(0, 1) + "*".repeat(id.length - 1);
  } else {
    maskedId = id.slice(0, 2) + "*".repeat(id.length - 2);
  }
  return `${maskedId}@${domain}`;
};

// 전화번호 마스킹 처리 함수
export const handleMaskPhone = (phone: string): string => {
  const maskedPhone =
    phone.slice(0, 3) + "-" + "*".repeat(4) + "-" + phone.slice(7);
  return maskedPhone;
};

// 관리자 카테고리 영어 텍스트 반환 함수
export const handleAdminCategoryText = (category: AdminCategory) => {
  switch (category) {
    case AdminCategory.LIBRARY:
      return `Tech Library`;
    case AdminCategory.INSIGHT:
      return `Tech Insight`;
    case AdminCategory.DX:
      return `DX Simulation`;
    case AdminCategory.DOWNLOADS:
      return `Downloads`;
    default:
      return "-";
  }
};

// 포스트 카테고리 텍스트 반환 함수
export const handlePostCategoryText = (category: PostCategory) => {
  switch (category) {
    case "Tech Library":
      return "Tech Library";
    case "Tech Insight":
      return "Tech Insight";
    case "DX Simulation":
      return "DX";
    case "Downloads":
      return "Downloads";
    default:
      return category;
  }
};
