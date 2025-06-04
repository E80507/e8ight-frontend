"use client";

import PostContainer from "./_components/pc/post-container";
import MobilePostContainer from "./_components/mobile/post-container";
import { Dispatch, useEffect } from "react";
import { SetStateAction, useState } from "react";
import { PostCategory, PostsRequestParams } from "@/api/dto/post";
import { usePost } from "@/hooks/post/use-post";

const AdminClient = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });

  // 게시물 목록 조회
  const { posts: allPosts = [], totalCount, isLoading, error } = usePost(params);

  // 페이지 변경 핸들러
  const handlePageChange: Dispatch<SetStateAction<number>> = (page) => {
    setParams((prev) => ({
      ...prev,
      page: typeof page === "function" ? page(prev.page) : page,
    }));
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filterParams: Partial<PostsRequestParams>) => {
    // 날짜 필터의 경우 시간 설정
    if (filterParams.startDate && filterParams.endDate) {
      const startDate = new Date(filterParams.startDate);
      const endDate = new Date(filterParams.endDate);

      filterParams.startDate = startDate.toISOString().split('T')[0];
      filterParams.endDate = endDate.toISOString().split('T')[0];
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

   // 필터 변경 핸들러
   const handleMobileFilterChange = (filterParams: Partial<PostsRequestParams>) => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // 필터 변경 시 첫 페이지로 이동
    }));
  };

  // 개별 선택/해제 핸들러
  const handleSelectItem = (id: string) => {
    setSelectedIds((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((itemId: string) => itemId !== id)
        : [...prev, id],
    );
  };

  // 페이지 변경이나 필터 변경 시 선택 초기화
  useEffect(() => {
    setSelectedIds([]);
  }, [params]);

  const currentPagePosts = allPosts.slice(
    (params.page - 1) * params.limit,
    params.page * params.limit,
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <>
      {/* pc 화면 */}
      <PostContainer
        allPosts={allPosts}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        params={params}
        totalCount={totalCount}
        handleCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />

      {/* 모바일 화면  */}
      <MobilePostContainer
        allPosts={allPosts}
        currentPagePosts={currentPagePosts}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        handleMobileFilterChange={handleMobileFilterChange}
        handlePageChange={handlePageChange}
        params={params}
        totalCount={totalCount}
        handleSelectItem={handleSelectItem}
      />
    </>
  )
}   

export default AdminClient;