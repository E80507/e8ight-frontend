// 카테고리 유형
export enum AdminCategory {
  LIBRARY = "Tech Library",
  INSIGHT = "Tech Insight",
  DX = "DX Simulation",
  DOWNLOADS = "Downloads",
}

export interface AdminRes {
  techBlogId: string; // 고유 블로그 아이디
  createdAt: string; // 등록일
  title: string; // 제목
  category: AdminCategory; // 카테고리
  writer: string; // 저자
}
