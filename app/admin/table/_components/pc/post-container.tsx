"use client";

import { usePost } from "@/hooks/post/use-post";
import { PostTable } from "./post-table";
import { useState, Dispatch, SetStateAction } from "react";
import { Post, PostCategory, PostsRequestParams } from "@/api/dto/post";
import PostTableToolbar from "./post-table-toolbar";
import PostFilterBar from "./post-filter-bar";
import Pagination from "@/app/_components/pagination";

const PostContainer = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });

  // 게시물 목록 조회
  const {
    posts: allPosts = [],
    isLoading,
    error,
  } = usePost(params);

  // 페이지 변경 핸들러
  const handlePageChange: Dispatch<SetStateAction<number>> = (page) => {
    setParams((prev) => ({
      ...prev,
      page: typeof page === "function" ? page(prev.page) : page,
    }));
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filterParams: Partial<PostsRequestParams>) => {
    // 날짜 필터의 경우, 데이터가 없을 때 필터를 적용하지 않음
    if (filterParams.startDate && filterParams.endDate) {
      const startDate = new Date(filterParams.startDate);
      const endDate = new Date(filterParams.endDate);
      
      // 현재 데이터에서 해당 날짜 범위에 데이터가 있는지 확인
      const hasDataInRange = allPosts.some(post => {
        const postDate = new Date(post.createdAt);
        return postDate >= startDate && postDate <= endDate;
      });

      if (!hasDataInRange) {
        console.log("No data in selected date range");
        return;
      }
    }

    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // 필터 변경 시 첫 페이지로 이동
    }));
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    
    if (category === "all") {
      handleFilterChange({ category: undefined });
    } else {
      handleFilterChange({ category: category as PostCategory });
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="hidden md:flex flex-col gap-10 max-w-[1194px] mx-auto p-10">
      {/* 필터 */}
      <PostFilterBar
        posts={allPosts}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        onFilterChange={handleFilterChange}
      />

      {/* 테이블 */}
      <div className="flex flex-col gap-[16px]">
        {/* 툴바 */}
        <PostTableToolbar totalCount={allPosts.length} />

        <div className="flex flex-col gap-[40px]">
          {/* 테이블 */}
          <PostTable
            data={allPosts.slice((params.page - 1) * params.limit, params.page * params.limit)}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            totalCount={allPosts.length}
          />

          {/* 페이지네이션 */}
          <Pagination
            currentPage={params.page}
            totalPages={Math.ceil(allPosts.length / params.limit)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
