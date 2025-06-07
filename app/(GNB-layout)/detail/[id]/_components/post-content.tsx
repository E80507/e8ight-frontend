"use client";

import { Post } from "@/types/post";
import QuillViewer from "@/components/QuillViewer";

interface PostContentProps {
  post: Post | undefined;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="tablet:mt-[40px] mt-[24px]">
      <QuillViewer content={post?.content} />
    </div>
  );
}
