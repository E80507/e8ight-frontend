import useSWR from "swr";
import { getPosts } from "@/api/posts";
import { PostsRequestParams, PostsResponse } from "@/api/dto/post";

export const usePosts = (params: PostsRequestParams) => {
  const queryKey = ["posts", params];

  const { data, error, isLoading, mutate } = useSWR<PostsResponse>(
    queryKey,
    () => getPosts(params),
  );

  return {
    posts: data?.posts ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: data?.currentPage ?? "1",
    limit: data?.limit ?? "10",
    hasNext: data?.hasNext ?? false,
    hasPrev: data?.hasPrev ?? false,
    isLoading,
    error,
    mutate,
  };
};
