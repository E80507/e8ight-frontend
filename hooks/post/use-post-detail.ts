import useSWR from "swr";
import { getPostDetail } from "@/api/post";
import { Post } from "@/types/post";

export const usePostDetail = (
  id: string,
  // type: "public" | "admin" = "public",
) => {
  const { data, error, isLoading } = useSWR<Post>(
    id ? `/posts/${id}` : null,
    () => getPostDetail(id),
  );

  return {
    post: data,
    isLoading,
    isError: error,
  };
};
