"use client";

import { Post } from "@/types/post";
import formattedDate from "@/util/date";
import { shareUrl } from "@/utils/share";
import { Share2Icon } from "lucide-react";

interface PostHeaderProps {
  post: Post | undefined;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="border-b border-[#EEEFF1] tablet:pb-[48px] pb-[24px]">
      {/* 제목 */}
      <p className="tablet:pretendard-h1-l pretendard-h1-r">{post?.title}</p>

      <div className="flex items-center gap-[8px] mt-[16px] tablet:pretendard-body-2 pretendard-body-3 text-[#A7A9B4]">
        {/* 날짜 */}
        <span>{formattedDate(post?.createdAt, "INPUT_DATE")}</span>

        {/* 구분선 */}
        <span className="relative before:absolute before:content-[''] before:w-[1px] before:h-[14px] before:bg-[#EEEFF1] before:top-1/2 before:-translate-y-1/2" />

        {/* 저자 */}
        <span>저자: {post?.author}</span>
      </div>

      <div className={`flex items-center justify-between ${post?.tags?.length ? 'tablet:mt-[40px] mt-[24px]' : 'tablet:mt-[40px]'}`}>
        {/* 태그 */}
        {post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-[8px]">
            {post?.tags.map((tag, index) => (
              <div
                key={index}
                className="flex justify-center items-center px-[16px] py-[8px] tablet:h-[40px] h-[33px] rounded-[8px] tablet:pretendard-title-m pretendard-title-xs bg-[#F4F4F6]"
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* 공유하기 */}
        <button
          onClick={() => shareUrl(window.location.href)}
          className="items-center gap-[8px] px-[16px] py-[12px] bg-[#F9FAFA] border border-[#D6D7DC] rounded-[10px] hidden tablet:flex"
        >
          <Share2Icon /> 공유하기
        </button>
      </div>
    </div>
  );
}
