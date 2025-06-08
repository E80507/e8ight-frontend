import { deletePosts } from "@/app/api/post";
import { useSWRConfig } from "swr";

export const useDeletePosts = () => {
  const { mutate } = useSWRConfig();

  const handleDeletePosts = async (postIds: string[]) => {
    try {
      await deletePosts(postIds);
      await mutate((key) => {
        if (!Array.isArray(key)) return false;
        return key[0] === "posts";
      });
      return true;
    } catch (error) {
      console.error("Failed to delete posts:", error);
      return false;
    }
  };

  return {
    deletePosts: handleDeletePosts,
  };
};
