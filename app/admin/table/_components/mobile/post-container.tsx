"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { PostsRequestParams } from "@/api/dto/post";
import MobileListItem from "./post-item";
import { usePosts } from "@/hooks/posts/use-posts";
import FloatingAddButton from "./post-add-button";
import PostSearchBar from "./post-search-bar";
import PostFilterBar from "./post-filter-bar";
import Pagination from "@/app/_components/pagination";
import PostTableToolbar from "./post-table-toolbar";

const MobilePostContainer = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });

  // 게시물 목록 조회
  const { posts: allPosts, totalCount, isLoading, error } = usePosts(params);
  
  // 필터링된 게시물 상태
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  // 전체 페이지 수 계산 
  const totalPages = Math.ceil((filteredPosts?.length || 0) / params.limit);

  // 현재 페이지의 게시물
  const currentPagePosts = filteredPosts?.slice(
    (params.page - 1) * params.limit,
    params.page * params.limit
  );

  // 페이지 변경 핸들러
  const handlePageChange: Dispatch<SetStateAction<number>> = (page) => {
    setParams((prev) => ({
      ...prev,
      page: typeof page === "function" ? page(prev.page) : page,
    }));
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filterParams: Partial<PostsRequestParams>) => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // 필터 변경 시 첫 페이지로 이동
    }));
  };

  // 필터링 결과 처리
  const handleFilteredDataChange = (newFilteredPosts: typeof allPosts) => {
    setFilteredPosts(newFilteredPosts);
    setParams(prev => ({ ...prev, page: 1 })); // 필터링 시 첫 페이지로 이동
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

  // API로부터 새 데이터를 받으면 필터링된 데이터도 업데이트
  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="md:hidden flex flex-col gap-[16px] bg-white">
      {/* 필터 바 */}
      <PostFilterBar
        totalCount={filteredPosts.length}
        posts={allPosts}
        onFilteredDataChange={handleFilteredDataChange}
        onFilterChange={handleFilterChange}
      />

      {/* 선택 영역 */}
      <PostTableToolbar
        posts={currentPagePosts}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />

      <div>
        {/* 게시물 리스트 */}
        {currentPagePosts.map((post, index) => (
          <MobileListItem
            post={post}
            key={post.id}
            isFirst={index === 0}
            isSelected={selectedIds.includes(post.id)}
            onSelect={() => handleSelectItem(post.id)}
          />
        ))}

        {/* 페이지네이션 */}
        <Pagination
          currentPage={params.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="py-[24px]"
        />
      </div>

      {/* 추가 버튼 */}
      <FloatingAddButton />
    </div>
  );
};

export default MobilePostContainer;
