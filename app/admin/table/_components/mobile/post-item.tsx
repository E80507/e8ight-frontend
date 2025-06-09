import { Post } from "@/app/api/dto/post";
import Check from "@/components/shared/check";
import Badge from "@/components/ui/badge";
import type { BadgeColor } from "@/components/ui/badge";
import formattedDate from "@/util/date";
import Link from "next/link";
import { MouseEvent } from "react";

const categoryMap: Record<string, BadgeColor> = {
  "Tech Insight": "green",
  "Tech Library": "blue",
  DX: "red",
  Downloads: "yellow",
};

interface PostItemProps {
  post: Post;
  isFirst?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const PostItem = ({ post, isFirst, isSelected, onSelect }: PostItemProps) => {
  const handleCheckboxClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect?.();
  };

  return (
    <Link
      href={`/admin/${post?.id}`}
      className={`flex flex-col gap-[14px] py-[24px] px-[16px] border-b border-[#EEEFF1] ${
        isFirst ? "border-t" : ""
      } ${isSelected ? "bg-[#F7FEFD]" : ""}`}
    >
      {/* 카테고리 */}
      <div
        className="flex items-center gap-[14px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative cursor-pointer" onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            checked={isSelected}
            className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
            readOnly
          />
          <Check type="square" isChecked={isSelected} />
        </div>

        <Badge color={categoryMap[post?.category]} text={post?.category} />
      </div>

      {/* 제목 */}
      <div className="pretendard-subtitle-m truncate max-w-full">
        {post?.title}
      </div>

      {/* 작성일, 작성자 */}
      <div className="flex items-center gap-[8px]">
        <div className="text-[#474953] pretendard-body-3">
          {formattedDate(post?.createdAt, "INPUT_DATE")}
        </div>
        <span className="relative before:absolute before:content-[''] before:w-[1px] before:h-[14px] before:bg-[#474953] before:top-1/2 before:-translate-y-1/2" />
        <div className="text-[#474953] pretendard-body-3">
          {post?.author || "-"}
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
