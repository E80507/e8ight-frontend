import Check from "@/components/shared/check";
import { Post } from "@/api/dto/post";
import React from "react";

interface PostTableToolbarProps {
  posts: Post[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const PostTableToolbar = ({
  posts,
  selectedIds,
  setSelectedIds,
}: PostTableToolbarProps) => {
  // 전체 선택 여부 확인
  const isAllSelected =
    posts.length > 0 && posts.every((post) => selectedIds.includes(post.id));

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((post) => post.id));
    }
  };

  return (
    <div className="flex items-center justify-between px-[16px]">
      {/* 전체 선택 버튼 */}
      <button type="button" className="flex items-center gap-[8px]">
        <div className="relative">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAll}
            className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
          />
          <Check type="square" isChecked={isAllSelected} />
        </div>

        {/* 전체 선택 텍스트 */}
        <p className="pretendard-subtitle-s">전체 선택</p>
      </button>

      {/* 선택 삭제 버튼 */}
      <button
        type="button"
        className="text-[#A7A9B4] pretendard-body-3"
        onClick={() => {
          console.log("선택된 항목:", selectedIds);
        }}
      >
        선택 삭제
      </button>
    </div>
  );
};

export default PostTableToolbar;
