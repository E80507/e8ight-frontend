"use client";

import MobileListItem from "./post-item";
import FloatingAddButton from "./post-add-button";
import PostFilterBar from "./post-filter-bar";
import Pagination from "@/app/_components/pagination";
import PostTableToolbar from "./post-table-toolbar";
import { PostsRequestParams } from "@/api/dto/post";
import { Post } from "@/api/dto/post";
import { searchDate } from "@/app/_components/calendar-single";

interface MobilePostContainerProps {
  allPosts: Post[];
  currentPagePosts: Post[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
  handlePageChange: React.Dispatch<React.SetStateAction<number>>;
  handleKeywordChange: (keyword: string) => void;
  params: PostsRequestParams;
  totalCount: number;
  handleSelectItem: (id: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  date: searchDate;
  onDateChange: (date: searchDate) => void;
}

const MobilePostContainer = ({
  allPosts,
  currentPagePosts,
  selectedIds,
  setSelectedIds,
  handleFilterChange,
  handlePageChange,
  handleKeywordChange,
  params,
  totalCount,
  handleSelectItem,
  category,
  onCategoryChange,
  date,
  onDateChange,
}: MobilePostContainerProps) => {
  return (
    <div className="flex flex-col">
      <div className="md:hidden flex flex-col gap-[16px] bg-white min-h-screen">
        {/* 필터 바 */}
        <PostFilterBar
          totalCount={allPosts.length}
          onFilterChange={handleFilterChange}
          handleKeywordChange={handleKeywordChange}
          category={category}
          onCategoryChange={onCategoryChange}
          date={date}
          onDateChange={onDateChange}
        />

        {/* 선택 영역 */}
        <PostTableToolbar
          posts={currentPagePosts}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />

        {totalCount > 0 ? (
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
              totalPages={Math.ceil(allPosts.length / params.limit)}
              onPageChange={handlePageChange}
              className="py-[24px]"
            />
          </div>
        ) : (
          <div className="flex-1 border flex justify-center items-center pretendard-body-1 text-[#A7A9B4]">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>

      {/* 추가 버튼 */}
      <FloatingAddButton />
    </div>
  );
};

export default MobilePostContainer;
