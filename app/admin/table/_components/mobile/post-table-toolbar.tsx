import Check from "@/components/shared/check";
import { Post } from "@/api/dto/post";
import React, { useState } from "react";
import { useDeletePosts } from "@/hooks/post/use-delete-posts";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";

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
  const { deletePosts } = useDeletePosts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  // 선택 삭제 핸들러
  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    const success = await deletePosts(selectedIds);
    console.log(success);
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
        className={`pretendard-body-3 ${
          selectedIds.length === 0 ? "text-[#A7A9B4]" : "text-[#474953]"
        }`}
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={selectedIds.length === 0}
      >
        선택 삭제
      </button>

      {isDeleteModalOpen && (
        <TwoButtonModal
          title="해당 게시글을 삭제하시나요?"
          desc="삭제된 게시글은 다시 복구할 수 없으며, 해당 카테고리 목록에서 제외됩니다."
          buttonText="확인"
          onClickFirstBtn={() => setIsDeleteModalOpen(false)}
          onClickSecondBtn={handleDelete}
        />
      )}
    </div>
  );
};

export default PostTableToolbar;
