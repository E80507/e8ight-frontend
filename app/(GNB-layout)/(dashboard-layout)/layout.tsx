"use client";

import HeroSection from "@/components/shared/dashboard/hero-section";
import SearchSection from "@/components/shared/dashboard/search-section";
import PostList from "@/components/shared/dashboard/post-list";
import Pagination from "@/app/_components/pagination";
import { useDashboardPosts } from "@/hooks/dashboard/use-dashboard-posts";

const DashboardLayout = () => {
  const {
    posts,
    totalPages,
    title,
    text,
    handleSearch,
    currentPage,
    keyword,
    setCurrentPage,
  } = useDashboardPosts();

  return (
    <>
      <HeroSection title={title} />
      <div className="mx-auto max-w-[1440px] px-[16px] py-6 tablet:p-[30px] web:px-[120px] web:py-20">
        <SearchSection keyword={keyword} onSearch={handleSearch} text={text} />
        <PostList posts={posts} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            className="py-[24px] tablet:mt-[100px] tablet:py-0"
          />
        )}
      </div>
    </>
  );
};
export default DashboardLayout;
