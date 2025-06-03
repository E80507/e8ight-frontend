"use client";

import { usePosts } from "@/hooks/posts/use-posts";
import { PostTable } from "./post-table";
import { useState, Dispatch, SetStateAction } from "react";
import { PostsRequestParams } from "@/api/dto/post";
import PostTableToolbar from "./post-table-toolbar";
import PostFilterBar from "./post-filter-bar";
import Pagination from "@/app/_components/pagination";

const PostContainer = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });

  // 게시물 목록 조회
  const { posts, totalCount, isLoading, error } = usePosts(params);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalCount / params.limit);

  // 페이지 변경 핸들러
  const handlePageChange: Dispatch<SetStateAction<number>> = (page) => {
    setParams((prev) => ({
      ...prev,
      page: typeof page === "function" ? page(prev.page) : page,
    }));
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="hidden md:flex flex-col gap-10 max-w-[1194px] mx-auto p-10">
      {/* 필터 */}
      <PostFilterBar />

      {/* 테이블 */}
      <div className="flex flex-col gap-[16px]">
        {/* 툴바 */}
        <PostTableToolbar totalCount={totalCount} />

        <div className="flex flex-col gap-[40px]">
          {/* 테이블 */}
          <PostTable
            data={posts}
            totalCount={totalCount}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />

          {/* 페이지네이션 */}
          <Pagination
            currentPage={params.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
