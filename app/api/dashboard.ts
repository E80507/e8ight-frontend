import { apiFetch } from "@/util/fetch";
import { GetPostsReq, SearchReq } from "./dto/dashboard";

// 포스트 검색
export const fetchPostsByTitle = async (data: SearchReq) => {
  try {
    const res = await apiFetch(`/search`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포스트 검색에 실패했습니다.");
  }
};

// 포스트 전체 조회
export const getPosts = async (data: GetPostsReq) => {
  try {
    const res = await apiFetch(`/posts?page=${data.page}&limit=${data.limit}`, {
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("전체 포스트 조회에 실패했습니다.");
  }
};

// 목 데이터 생성
const allDummyPosts = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  title: `더미 게시물 ${i + 1}`,
  content: `이것은 더미 게시물 ${i + 1}의 내용입니다.`,
  thumbnail: "/images/dummy-dashboard.webp",
  category: "LIBRARY",
  author: `작성자 ${i + 1}`,
  mainImage: "/images/main.png",
  tags: [`태그${(i % 3) + 1}`],
  keywords: [`키워드${(i % 5) + 1}`],
  linkUrl: `https://example.com/post/${i + 1}`,
  fileUrls: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: "",
}));

// getPosts - 페이지네이션 처리
export const mockGetPosts = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = allDummyPosts.slice(start, end);

  return {
    posts: paginatedPosts,
    totalCount: allDummyPosts.length,
    totalPages: Math.ceil(allDummyPosts.length / limit),
    currentPage: page,
    limit,
    hasNext: end < allDummyPosts.length,
    hasPrev: start > 0,
  };
};

// fetchPostsByTitle - 키워드 검색
export const mockFetchPostsByTitle = async ({ query }: { query: string }) => {
  const filteredPosts = allDummyPosts.filter((post) =>
    post.title.includes(query),
  );

  return {
    posts: filteredPosts,
    totalPages: Math.ceil(filteredPosts.length / 6),
  };
};
