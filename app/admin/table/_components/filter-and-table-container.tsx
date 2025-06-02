import { useState } from "react";
import { PostsRequestParams } from "@/api/dto/post";
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

  const { posts, totalCount, isLoading, error } = usePosts(params);

  const handleFilterChange = (newParams: PostsRequestParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  if (error) return <div>에러</div>;

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="w-full">
      <FilterSearchBox
        onFilterChange={handleFilterChange}
        setSelectedIds={setSelectedIds}
      />
      <AdminTable
        data={posts}
        totalCount={totalCount}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}
