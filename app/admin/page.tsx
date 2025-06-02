"use client";

import { PostsContainer } from "./table/_components/posts-container";
import MobilePostsContainer from "./table/_components/mobile/mobile-posts-container"

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10 tablet:p-10 max-w-[1200px] mx-auto">
      {/* pc 화면 */}
      <div className="hidden md:block">
        <PostsContainer />
      </div>

      {/* 모바일 화면  */}
      <div className="block md:hidden">
        <MobilePostsContainer />
      </div>
    </div>
  );
}
