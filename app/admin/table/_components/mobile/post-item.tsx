import { Post } from "@/api/dto/post";
import Check from "@/components/shared/check";
import Badge from "@/components/ui/badge";
import type { BadgeColor } from "@/components/ui/badge";
import formattedDate from "@/util/date";
import Link from "next/link";

const categoryMap: Record<string, BadgeColor> = {
  INSIGHT: "green",
  LIBRARY: "blue",
  DX: "red",
  DOWNLOADS: "yellow",
};

interface PostItemProps {
  post: Post;
  isFirst?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const PostItem = ({ post, isFirst, isSelected, onSelect }: PostItemProps) => {
  return (
    <Link
      href={`/admin/${post?.id}`}
      className={`flex flex-col gap-[14px] py-[24px] px-[16px] border-b border-[#EEEFF1] ${
        isFirst ? "border-t" : ""
      } ${isSelected ? "bg-[#F7FEFD]" : ""}`}
    >
      {/* 카테고리 */}
      <div className="flex items-center gap-[14px]">
        <button type="button" className="relative">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
          />
          <Check type="square" isChecked={isSelected} />
        </button>
        <Badge color={categoryMap[post?.category]} text={post?.category} />
      </div>

      {/* 제목 */}
      <div className="pretendard-subtitle-m truncate">{post?.title}</div>

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
