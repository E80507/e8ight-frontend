"use client";

import { usePosts } from "@/hooks/posts/use-posts";
import { PostTable } from "./post-table";
import { useEffect, useState } from "react";
import { PostsRequestParams } from "@/api/dto/post";
import PostTableToolbar from "./post-table-toolbar";
import PostFilterBar from "./post-filter-bar";

const MobilePostContainer = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });
  const { posts, totalCount, isLoading, error } = usePosts(params);

  useEffect(() => {
    setParams({
      page: 1,
      limit: 10,
      sortOrder: "DESC",
    });
  }, [params]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="hidden md:flex flex-col gap-10 max-w-[1194px] mx-auto p-10">
      {/* 필터 */}
      <PostFilterBar />

      {/* 테이블 */}
      <div className="flex flex-col gap-[16px]">
        <PostTableToolbar totalCount={totalCount} />

        <PostTable
          data={posts}
          totalCount={totalCount}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>
    </div>
  );
};

export default MobilePostContainer;
