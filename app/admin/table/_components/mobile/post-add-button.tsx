import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CREATE_POST_PAGE } from "@/constants/path";

const PostAddButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="fixed bottom-[27px] right-[27px] bg-primary text-white rounded-full size-[56px] flex tablet:hidden items-center justify-center cursor-pointer shadow-[0px_4px_5px_0px_#9F9F9F40]"
      onClick={() => router.push(CREATE_POST_PAGE)}
    >
      <Plus />
    </button>
  );
};

export default PostAddButton;
