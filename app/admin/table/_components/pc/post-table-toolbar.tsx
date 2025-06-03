import { Button } from "@/components/ui/button";
import { CREATE_POST_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";
interface PostTableToolbarProps {
  totalCount: number;
}

const PostTableToolbar = ({ totalCount }: PostTableToolbarProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between justify-between">
      <p className="pretendard-subtitle-l">총 {totalCount}건</p>

      <div className="flex items-center gap-[8px]">
        <Button variant={"outline"} size={"lg"} className="max-w-[97px]">
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
