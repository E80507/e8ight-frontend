import useSWR from "swr";
import { Post } from "@/types/post";
import { getPostDetail } from "@/app/api/post";

export const usePostDetail = (id: string) => {
  const { data: post, error: isError } = useSWR<Post>(
    id ? `posts/${id}` : null,
    () => getPostDetail(id),
  );

  return {
    post,
    isError,
  };
};
