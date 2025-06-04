import { Button } from "@/components/ui/button";
import { CREATE_POST_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";
import { useDeletePosts } from "@/hooks/post/use-delete-posts";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import { useState } from "react";

interface PostTableToolbarProps {
  totalCount: number;
  selectedIds: string[];
}

const PostTableToolbar = ({ totalCount, selectedIds }: PostTableToolbarProps) => {
  const router = useRouter();
  const { deletePosts } = useDeletePosts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{success: boolean; message: string}>({ success: false, message: "" });

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      setDeleteResult({
        success: false,
        message: "삭제할 게시물을 선택해주세요."
      });
      return;
    }

    setIsDeleteModalOpen(false);
    const success = await deletePosts(selectedIds);
    
    setDeleteResult({
      success,
      message: success ? "게시물이 삭제되었습니다." : "게시물 삭제에 실패했습니다."
    });
  };

  const handleCloseResultModal = () => {
    if (deleteResult.success) {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-between justify-between">
      <p className="pretendard-subtitle-l">총 {totalCount}건</p>

      <div className="flex items-center gap-[8px]">
        <Button 
          variant={"outline"} 
          size={"lg"} 
          className="max-w-[97px]"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={selectedIds.length === 0}
        >
          삭제하기
        </Button>

        {isDeleteModalOpen && (
          <TwoButtonModal
            title="해당 게시글을 삭제하시나요?"
            desc="삭제된 게시글은 다시 복구할 수 없으며, 해당 카테고리 목록에서 제외됩니다."
            buttonText="확인"
            onClickFirstBtn={() => setIsDeleteModalOpen(false)}
            onClickSecondBtn={handleDelete}
          />
        )}

        <Button
          size={"lg"}
          className="max-w-[97px]"
          onClick={() => router.push(CREATE_POST_PAGE)}
        >
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default PostTableToolbar;
