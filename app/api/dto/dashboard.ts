// 포스트 검색
export interface SearchReq {
  page: number;
  limit: number;
  category: string;
  keyword: string;
}

// 포스트 전체 조회
export interface GetPostsReq {
  page: number;
  limit: number;
  category: string;
}
