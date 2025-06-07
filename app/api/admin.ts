import { CreatePostReq, CreateTagReq, DeleteTagReq } from "./dto/admin";
import { apiFetch } from "@/util/fetch";

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
