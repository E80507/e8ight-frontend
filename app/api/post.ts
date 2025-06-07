import { PostsRequestParams, PostsResponse } from "./dto/post";
import { apiFetch } from "@/util/fetch";
import { Post } from "@/types/post";

export const deletePost = async (postId: string) => {
  return apiFetch(`/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
    },
  });
};

export const deletePosts = async (postIds: string[]) => {
  const promises = postIds.map((id) => deletePost(id));
  return Promise.all(promises);
};

export const getPosts = async (
  params: PostsRequestParams,
): Promise<PostsResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page.toString());
  queryParams.append("limit", params.limit.toString());

  if (params.category) {
    queryParams.append("category", params.category);
  }
  if (params.startDate) {
    queryParams.append("startDate", params.startDate);
  }
  if (params.endDate) {
    queryParams.append("endDate", params.endDate);
  }
  if (params.sortOrder) {
    queryParams.append("sortOrder", params.sortOrder);
  }
  if (params.keyword) {
    queryParams.append("keyword", params.keyword);
  }

  return apiFetch(`/posts?${queryParams.toString()}`);
};

export const getPostDetail = async (id: string): Promise<Post> => {
  return apiFetch(`/posts/${id}`);
};
