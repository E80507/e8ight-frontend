// 포스트 검색
export interface SearchReq {
  query: string;
  searchFields: string[];
}

// 포스트 전체 조회
export interface GetPostsReq {
  page: number;
  limit: number;
}
