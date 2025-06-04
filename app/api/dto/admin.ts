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

export interface PostReq {
  title: string;
  content: string;
  thumbnail: string;
  author?: string;
  mainImage?: string;
  category: AdminCategory;
  tags: string[];
  keywords: string[];
  linkUrl: string;
  fileIds: string[];
}

// 포스트 생성
export interface CreatePostReq {
  title: string;
  content: string;
  thumbnail?: File | string;
  author?: string;
  mainIamge?: string;
  category: string;
  tags?: string[];
  keywords?: string[];
  linkUrl?: string;
  fileId?: string[];
}

// 키워드 태그 생성
export interface CreateTagReq {
  content: string;
}

// 키워드 태그 삭제
export interface DeleteTagReq {
  id: string;
}
