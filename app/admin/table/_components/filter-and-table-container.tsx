import { useState } from "react";
import { Post, PostsRequestParams } from "@/api/dto/post";
import { usePosts } from "@/hooks/posts/use-posts";
import { AdminTable } from "./admin-table";
import FilterSearchBox from "./filter-search-box";

export function FilterAndTableContainer() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const { posts, totalCount, isLoading, error } = usePosts(params);

  const handleFilterChange = (newParams: PostsRequestParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
    setIsFiltering(false);
  };

  const handleSearch = (filtered: Post[]) => {
    setFilteredPosts(filtered);
    setIsFiltering(true);
  };

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
      <AdminTable
        data={displayPosts}
        totalCount={displayCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}
