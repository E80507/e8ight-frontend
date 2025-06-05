"use client";

import QuillViewer from "@/components/QuillViewer";
import { Button } from "@/components/ui/button";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import { useRouter } from "next/navigation";
import { useDeletePosts } from "@/hooks/post/use-delete-posts";
import { mutate } from "swr";
import Image from "next/image";

interface AdminDetailContentProps {
  params: { id: string };
}

const AdminDetailContent = ({ params }: AdminDetailContentProps) => {
  const router = useRouter();
  const { id } = params;
  const { post, isError } = usePostDetail(id as string);
  const { deletePosts } = useDeletePosts();

  // 삭제하기
  const handleDelete = async () => {
    const confirmed = confirm(
      "해당 게시글을 삭제하시나요?\n\n삭제된 게시글은 다시 복구할 수 없으며, 해당 카테고리 목록에서 제외됩니다.",
    );
    if (confirmed) {
      const success = await deletePosts([id as string]);
      if (success) {
        await mutate(
          (key) => typeof key === "string" && key.startsWith("posts"),
        );
        router.push("/admin");
      }
    }
  };

  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>로딩 중...</div>;

  const showField = (field: string): boolean => {
    switch (post?.category) {
      case "LIBRARY":
      case "INSIGHT":
        return [
          "category",
          "author",
          "title",
          "content",
          "thumbnail",
          "tags",
          "keywords",
        ].includes(field);
      case "DX":
        return ["category", "title", "thumbnail", "linkUrl"].includes(field);
      case "DOWNLOADS":
        return ["category", "title", "thumbnail", "files"].includes(field);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1240px] tablet:px-[16px]">
        <div className="hidden h-[48px] justify-between tablet:flex">
          <h3 className="pretendard-title-l">게시글 상세정보</h3>

          <div className="flex items-center gap-[8px]">
            <Button
              variant="outline"
              className="h-[48px] w-[97px]"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
            <Button className="h-[48px] w-[97px]">수정하기</Button>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="mt-[12px] border border-[#EEEFF1]">
          <div className="flex flex-col border-b  border-[#EEEFF1] tablet:flex-row">
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              카테고리
            </div>

            <div className="flex min-h-[45px] items-center p-[12px] pretendard-subtitle-s">
              {post?.category}
            </div>
          </div>

          {/* 저자 */}
          {showField("author") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                저자
              </div>

              <div className="flex min-h-[45px] items-center px-[12px] pretendard-subtitle-s">
                {post?.author}
              </div>
            </div>
          )}

          {/* 제목 */}
          <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              제목
            </div>

            <div className="flex min-h-[45px] flex-1 items-center px-[12px] pretendard-subtitle-s">
              {post?.title}
            </div>
          </div>

          {/* 상세내용 */}
          {showField("content") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                상세내용
              </div>

              <div className="flex flex-1 items-center px-[12px] pretendard-subtitle-s">
                <QuillViewer content={post?.content} />
              </div>
            </div>
          )}

          {/* 썸네일 */}
          <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              썸네일
            </div>

            <div className="flex flex-1 items-center px-[20px] py-[16px] pretendard-subtitle-s">
              <div className="relative h-[100px] w-full overflow-hidden bg-gray-100 tablet:h-[210px]">
                <Image
                  src={post?.thumbnail || ""}
                  alt={post?.title || "썸네일 이미지"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 태그 */}
          {showField("tags") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                태그
              </div>

              <div className="flex flex-1 items-center gap-[8px] px-[16px] py-[12px] pretendard-subtitle-s">
                {post?.tags?.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="flex h-[40px] items-center justify-center rounded-[8px] bg-[#F4F4F6] px-[16px] pretendard-body-2"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 검색 키워드 */}
          {showField("keywords") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                검색 키워드
              </div>

              <div className="flex flex-1 items-center px-[16px] py-[12px] pretendard-subtitle-s">
                {post?.keywords?.map((keyword: string, index: number) => (
                  <div
                    key={index}
                    className="flex h-[40px] items-center justify-center rounded-[8px] bg-[#F4F4F6] px-[16px] pretendard-body-2"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 링크 연결 */}
          {showField("linkUrl") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                링크 연결
              </div>

              <div className="flex flex-1 items-center px-[16px] py-[12px] pretendard-subtitle-s">
                {post?.linkUrl}
              </div>
            </div>
          )}

          {/* 첨부파일 */}
          {showField("files") && (
            <div className="flex flex-col border-b border-[#EEEFF1] tablet:flex-row">
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                첨부파일
              </div>

              <div className="flex flex-1 items-center px-[16px] py-[12px] pretendard-subtitle-s">
                {/* {post?.files} */}
              </div>
            </div>
          )}

          <div className="flex gap-[8px] px-[16px] py-[40px] tablet:hidden">
            <Button
              variant="outline"
              className="h-[48px] w-[97px] flex-1"
              onClick={handleDelete}
            >
              삭제하기
            </Button>

            <Button className="h-[48px] w-[97px] flex-1">수정하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailContent;
