import useSWR from "swr";
import { getPosts } from "@/api/post";
import { PostsRequestParams, PostsResponse } from "@/api/dto/post";

export const usePost = (params: PostsRequestParams) => {
  const { data, error, isLoading, mutate } = useSWR<PostsResponse>(
    ["posts", JSON.stringify(params)],
    async () => {
      return getPosts(params);
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 2000,
    },
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
