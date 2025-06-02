"use client";

import { PostsContainer } from "./table/_components/posts-container";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10 p-10 max-w-[1200px] mx-auto">
      <PostsContainer />
    </div>
  );
}
