import { useState, useCallback } from "react";
import { Post, PostsRequestParams } from "@/api/dto/post";
import { usePosts } from "@/hooks/posts/use-posts";
import { AdminTable } from "./admin-table";
import FilterSearchBox from "./filter-search-box";
import { TableControlBox } from "./table-control-box";

export function PostsContainer() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const { posts, totalCount, isLoading, error, mutate } = usePosts(params);

  const handleFilterChange = useCallback((newParams: PostsRequestParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
    setIsFiltering(false);
  }, []);

  const handleSearch = useCallback((filtered: Post[]) => {
    setFilteredPosts(filtered);
    setIsFiltering(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (selectedIds.length > 0) {
      if (
        confirm(`선택한 ${selectedIds.length}개의 게시글을 삭제하시겠습니까?`)
      ) {
        try {
          console.log("Delete posts:", selectedIds);
          await mutate();
          setSelectedIds([]);
        } catch (error) {
          console.error("Failed to delete posts:", error);
          alert("게시글 삭제에 실패했습니다.");
        }
      }
    }
  }, [selectedIds, mutate]);

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩 중...</div>;

  const displayPosts = isFiltering ? filteredPosts : posts;
  const displayCount = isFiltering ? filteredPosts.length : totalCount;

  return (
    <div className="w-full">
      <FilterSearchBox
        onFilterChange={handleFilterChange}
        setSelectedIds={setSelectedIds}
        posts={posts}
        onSearch={handleSearch}
      />

      <TableControlBox
        totalCount={displayCount}
        selectedCount={selectedIds.length}
        onDelete={handleDelete}
      />

      <AdminTable
        data={displayPosts}
        totalCount={displayCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}
