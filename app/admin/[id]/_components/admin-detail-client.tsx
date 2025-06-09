"use client";

import QuillViewer from "@/components/quill-viewer";
import { Button } from "@/components/ui/button";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import { useRouter } from "next/navigation";
import { useDeletePosts } from "@/hooks/post/use-delete-posts";
import { mutate } from "swr";
import Image from "next/image";
import Loading from "@/components/shared/loading/loading";
import { EDIT_POST_PAGE } from "@/constants/path";

interface AdminDetailContentProps {
  params: { id: string };
}

const AdminDetailClient = ({ params }: AdminDetailContentProps) => {
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
  if (!post) return <Loading />;

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
      <div className="mx-auto max-w-[1440px] web:px-[120px] tablet:pt-[24px] tablet:pb-[40px] tablet:px-[30px]">
        {/* 데스크탑 버튼 */}
        <div className="hidden mb-[12px] h-[48px] justify-between tablet:flex">
          <h3 className="pretendard-title-l">게시글 상세정보</h3>

          <div className="flex items-center gap-[8px]">
            <Button
              variant="outline"
              className="h-[48px] w-[97px]"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
            <Button
              className="h-[48px] w-[97px]"
              onClick={() => {
                router.push(`${EDIT_POST_PAGE}/${id}`);
              }}
            >
              수정하기
            </Button>
          </div>
        </div>

        {/* 데스크탑 내용 */}
        <div className="tablet:mb-0 mb-[128px] border border-[#EEEFF1]">
          {/* 카테고리 */}
          <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
            {/* 항목 제목 */}
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              카테고리
            </div>

            {/* 항목 내용 */}
            <div className="flex min-h-[45px] items-center pretendard-subtitle-s py-[12px] px-[16px]">
              {post?.category}
            </div>
          </div>

          {/* 저자 */}
          {showField("author") && (
            <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                저자
              </div>

              {/* 항목 내용 */}
              <div className="flex min-h-[45px] items-center pretendard-subtitle-s py-[12px] px-[16px]">
                {post?.author}
              </div>
            </div>
          )}

          {/* 제목 */}
          <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
            {/* 항목 제목 */}
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              제목
            </div>

            {/* 항목 내용 */}
            <div className="flex min-h-[45px] flex-1 items-center pretendard-subtitle-s py-[12px] px-[16px]">
              {post?.title}
            </div>
          </div>

          {/* 상세내용 */}
          {showField("content") && (
            <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                상세내용
              </div>

              {/* 항목 내용 */}
              <div className="flex flex-1 items-center pretendard-subtitle-s px-[16px] py-[12px] admin-detail-content">
                <QuillViewer content={post?.content} />
              </div>
            </div>
          )}

          {/* 썸네일 */}
          <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
            {/* 항목 제목 */}
            <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
              썸네일
            </div>

            {/* 항목 내용 */}
            <div className="flex flex-1 items-center pretendard-subtitle-s py-[12px] px-[16px]">
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
            <div className="flex flex-col border-b tablet:border-b border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                태그
              </div>

              <div className="flex flex-1 items-center gap-[8px] min-h-[45px] pretendard-subtitle-s py-[12px] px-[16px]">
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
            <div className="flex flex-col border-b tablet:border-b-0 border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                검색 키워드
              </div>

              {/* 항목 내용 */}
              <div className="flex flex-1 gap-[8px] items-center min-h-[45px] pretendard-subtitle-s py-[12px] px-[16px]">
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
            <div className="flex flex-col border-b tablet:border-b-0 border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                링크 연결
              </div>

              {/* 항목 내용 */}
              <div className="flex flex-1 items-center px-[16px] py-[12px] pretendard-subtitle-s">
                {post?.linkUrl}
              </div>
            </div>
          )}

          {/* 첨부파일 */}
          {showField("files") && (
            <div className="flex flex-col border-b tablet:border-b-0 border-[#EEEFF1] tablet:flex-row">
              {/* 항목 제목 */}
              <div className="flex min-h-[45px] w-full items-center bg-[#EEEFF1] px-[16px] pretendard-body-3 tablet:w-[160px]">
                첨부파일
              </div>

              {/* 항목 내용 */}
              <div className="flex flex-1 flex-col pretendard-subtitle-s">
                {post?.files && post.files.length > 0 ? (
                  post.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex min-h-[45px] px-[16px] py-[12px] items-center justify-between"
                    >
                      <div className="flex items-center gap-[10px] flex-1">
                        <div className="pretendard-body-3 truncate text-[#474953]">
                          {file.fileName}
                        </div>
                      </div>
                      <div className="pretendard-body-3 text-[#474953] min-w-[100px] text-right">
                        {file.fileSize
                          ? `${Math.round(file.fileSize / 1024)} KB`
                          : ""}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center min-h-[45px] px-[16px] py-[12px] text-label-assistive">
                    등록된 파일이 없습니다.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 모바일 버튼 */}
          <div className="fixed bottom-0 w-full flex items-center justify-center gap-[8px] px-[16px] h-[128px] tablet:hidden border-t border-[#EEEFF1] bg-white">
            {/* 삭제하기 */}
            <Button
              variant="outline"
              className="h-[48px] w-[97px] flex-1"
              onClick={handleDelete}
            >
              삭제하기
            </Button>

            {/* 수정하기 */}
            <Button
              className="h-[48px] w-[97px] flex-1"
              onClick={() => {
                router.push(`${EDIT_POST_PAGE}/${id}`);
              }}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailClient;
