import { Button } from "@/components/ui/button";
import { CREATE_POST_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";
import { useDeletePosts } from "@/hooks/post/use-delete-posts";

interface PostTableToolbarProps {
  totalCount: number;
  selectedIds: string[];
}

const PostTableToolbar = ({
  totalCount,
  selectedIds,
}: PostTableToolbarProps) => {
  const router = useRouter();
  const { deletePosts } = useDeletePosts();

  const handleDelete = async () => {
    const confirmed = confirm(
      "해당 게시글을 삭제하시나요?\n\n삭제된 게시글은 다시 복구할 수 없으며, 해당 카테고리 목록에서 제외됩니다.",
    );
    if (confirmed) {
      const success = await deletePosts(selectedIds);
      console.log(success);
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
          onClick={handleDelete}
          disabled={selectedIds.length === 0}
        >
          삭제하기
        </Button>

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
