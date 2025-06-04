"use client";

import HeroSection from "@/components/shared/dashboard/hero-section";
import SearchSection from "@/components/shared/dashboard/search-section";
import PostList from "@/components/shared/dashboard/post-list";
import Pagination from "@/app/_components/pagination";
import { useDashboardPosts } from "@/hooks/dashboard/use-dashboard-posts";

const DashboardLayout = () => {
  const {
    keyword,
    setKeyword,
    handleSearch,
    posts,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useDashboardPosts();

  return (
    <>
      <HeroSection />
      <div className="p-6 tablet:p-[30px] web:px-[120px] web:py-20">
        <SearchSection
          keyword={keyword}
          onSearch={handleSearch}
          setKeyword={setKeyword}
        />
        <PostList posts={posts} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="tablet:mt-[100px] tablet:py-0 py-[24px]"
          />
        )}
      </div>
    </>
  );
};
export default DashboardLayout;
