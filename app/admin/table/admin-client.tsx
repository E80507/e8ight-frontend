"use client";

import PostContainer from "./_components/pc/post-container";
import MobilePostContainer from "./_components/mobile/post-container";
import { Dispatch, useEffect, useState } from "react";
import { SetStateAction } from "react";
import { PostsRequestParams } from "@/app/api/dto/post";
import { usePost } from "@/hooks/post/use-post";
import { usePostFilters } from "@/hooks/use-post-filters";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/loading/loading";

const AdminClient = () => {
  const pathname = usePathname();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
    keyword: "",
  });

  // 공유 필터 상태 관리
  const {
    category,
    date,
    setCategory,
    setDate,
    handleFilterChange: handleSharedFilterChange,
    resetFilters,
  } = usePostFilters((filterParams) => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // 필터 변경 시 첫 페이지로 이동
    }));
  });

  // 게시물 목록 조회
  const { posts, totalCount, error, mutate } = usePost(params);

  // 라우터 변경 감지하여 데이터 갱신
  useEffect(() => {
    if (pathname === "/admin") {
      mutate();
    }
  }, [pathname, mutate]);

  // 로딩 상태 관리
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [params]);

  // 페이지 변경 핸들러
  const handlePageChange: Dispatch<SetStateAction<number>> = (page) => {
    setParams((prev) => ({
      ...prev,
      page: typeof page === "function" ? page(prev.page) : page,
    }));
  };

  // 검색어 변경 핸들러
  const handleKeywordChange = (keyword: string) => {
    setParams((prev) => ({
      ...prev,
      keyword,
      page: 1, // 검색어 변경 시 첫 페이지로 이동
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

  if (error) return <div>에러</div>;

  return (
    <div className="relative">
      {/* 로딩 컴포넌트 */}
      {isLoading && <Loading />}

      {/* 화면 컴포넌트 */}
      <div>
        {/* pc 화면 */}
        <PostContainer
          allPosts={posts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          handleFilterChange={handleSharedFilterChange}
          handlePageChange={handlePageChange}
          handleKeywordChange={handleKeywordChange}
          params={params}
          totalCount={totalCount}
          currentCategory={category}
          onCategoryChange={setCategory}
          date={date}
          onDateChange={setDate}
          resetFilters={resetFilters}
        />

        {/* 모바일 화면  */}
        <MobilePostContainer
          allPosts={posts}
          currentPagePosts={posts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          handleFilterChange={handleSharedFilterChange}
          handlePageChange={handlePageChange}
          handleKeywordChange={handleKeywordChange}
          params={params}
          totalCount={totalCount}
          handleSelectItem={handleSelectItem}
          category={category}
          onCategoryChange={setCategory}
          date={date}
          onDateChange={setDate}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default AdminClient;
