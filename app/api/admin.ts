import {
  AdminRes,
  AdminCategory,
  CreatePostReq,
  CreateTagReq,
  DeleteTagReq,
} from "./dto/admin";
import { apiFetch } from "@/util/fetch";

const mockTechBlogList: AdminRes[] = [
  {
    techBlogId: "blog_001",
    createdAt: "2025-05-31",
    title: "디지털 트윈 기술의 미래",
    category: AdminCategory.LIBRARY,
    writer: "김혜란",
  },
  {
    techBlogId: "blog_002",
    createdAt: "2025-05-31",
    title: "AI와 메타버스의 융합",
    category: AdminCategory.INSIGHT,
    writer: "김혜란",
  },
  {
    techBlogId: "blog_003",
    createdAt: "2025-05-31",
    title: "스마트 시티 구현 사례",
    category: AdminCategory.DX,
    writer: "김혜란",
  },
  {
    techBlogId: "blog_004",
    createdAt: "2025-05-31",
    title: "산업용 IoT 플랫폼",
    category: AdminCategory.DOWNLOADS,
    writer: "김혜란",
  },
];

// 테크 블로그 목록 조회
export const getTechBlogList = async (): Promise<AdminRes[]> => {
  return mockTechBlogList;

  // 실제 API 호출 코드 (주석 처리)
  /*
  try {
    const res = await apiFetch(
      `/admin/tech-blog/list?year=${year}&month=${month}&day=${day}`,
    );
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("테크 블로그 목록 조회에 실패했습니다.");
  }
  */
};

// 포스트 게시
export const createPost = async (data: CreatePostReq) => {
  try {
    const res = await apiFetch(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("포스트 생성에 실패했습니다.");
  }
};

// 키워드 조회
export const getKeywords = async () => {
  try {
    const res = await apiFetch("/search/keywords", {
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("키워드 조회에 실패했습니다.");
  }
};

// 키워드 생성
export const createKeyword = async (data: CreateTagReq) => {
  try {
    const res = await apiFetch("/search/keywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("키워드 생성에 실패했습니다.");
  }
};

// 키워드 삭제
export const deleteKeyword = async (data: DeleteTagReq) => {
  try {
    const res = await apiFetch(`/search/keywords/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("키워드 삭제에 실패했습니다.");
  }
};

// 태그 조회
export const getTags = async () => {
  try {
    const res = await apiFetch("/search/tags", {
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("태그 조회에 실패했습니다.");
  }
};
// 태그 생성
export const createTag = async (data: CreateTagReq) => {
  try {
    const res = await apiFetch("/search/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("태그 생성에 실패했습니다.");
  }
};
// 태그 삭제
export const deleteTag = async (data: DeleteTagReq) => {
  try {
    const res = await apiFetch(`/search/tags/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("태그 삭제에 실패했습니다.");
  }
};
