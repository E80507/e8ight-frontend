// 카테고리 유형
export enum AdminCategory {
  LIBRARY = "Library",
  INSIGHT = "Tech Insight",
  DX = "DX",
  DOWNLOADS = "Downloads",
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
  fileIds?: string[];
}

// 키워드 태그 생성
export interface CreateTagReq {
  content: string;
}

// 키워드 태그 삭제
export interface DeleteTagReq {
  id: string;
}
