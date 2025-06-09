export type PostCategory =
  | "Tech Library"
  | "Tech Insight"
  | "DX Simulation"
  | "Downloads";
export type SortOrder = "DESC" | "ASC" | "RANDOM";

export interface PostsRequestParams {
  page: number;
  limit: number;
  category?: PostCategory;
  startDate?: string;
  endDate?: string;
  sortOrder?: SortOrder;
  keyword?: string;
}

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  content: string;
  thumbnail: string;
  category: PostCategory;
  author: string | null;
  mainImage: string;
  tags: string[];
  keywords: string[];
  linkUrl: string;
  fileIds: string[] | null;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  totalPages: number;
  currentPage: string;
  limit: string;
  hasNext: boolean;
  hasPrev: boolean;
}
