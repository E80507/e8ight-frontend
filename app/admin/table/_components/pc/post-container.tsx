"use client";

import { PostTable } from "./post-table";
import { Post, PostsRequestParams } from "@/api/dto/post";
import PostTableToolbar from "./post-table-toolbar";
import PostFilterBar from "./post-filter-bar";
import Pagination from "@/app/_components/pagination";

interface PostContainerProps {
  allPosts: Post[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
  handlePageChange: React.Dispatch<React.SetStateAction<number>>;
  params: PostsRequestParams;
  totalCount: number;
  handleCategoryChange: (category: string) => void;
  currentCategory: string;
}

const PostContainer = ({
  allPosts,
  selectedIds,
  setSelectedIds,
  handleFilterChange,
  handlePageChange,
  params,
  totalCount,
  handleCategoryChange,
  currentCategory,
}: PostContainerProps) => {
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
        <PostTableToolbar totalCount={totalCount} />

        <div className="flex flex-col gap-[40px]">
          {/* 테이블 */}
          <PostTable
            data={allPosts.slice(
              (params.page - 1) * params.limit,
              params.page * params.limit,
            )}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            totalCount={totalCount}
          />

          {/* 페이지네이션 */}
          <Pagination
            currentPage={params.page}
            totalPages={Math.ceil(totalCount / params.limit)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
