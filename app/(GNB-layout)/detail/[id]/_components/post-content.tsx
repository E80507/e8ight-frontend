"use client";

import { Post } from "@/types/post";
import QuillViewer from "@/components/quill-viewer";

interface PostContentProps {
  post: Post | undefined;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="tablet:mt-[40px] mt-[24px] admin-detail-content">
      <QuillViewer content={post?.content} />
    </div>
  );
}
