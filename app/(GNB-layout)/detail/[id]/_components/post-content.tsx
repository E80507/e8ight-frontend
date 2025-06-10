"use client";

import { Post } from "@/types/post";
import QuillViewer from "@/components/quill-viewer";
import Image from "next/image";
import { formatBytes } from "@/util/file";

interface PostContentProps {
  post: Post | undefined;
}

export default function PostContent({ post }: PostContentProps) {
  // 파일 다운로드
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
    }
  };

  // 전체 파일 다운로드
  const handleDownloadAll = async () => {
    if (!post?.files) return;

    try {
      for (const file of post.files) {
        await handleDownload(file.fileUrl, file.fileName);

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error("전체 파일 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <>
      {/* 카테고리가 다운로드가 아닐 경우 QuillViewer 표시 */}
      {post?.category !== "Downloads" && (
        <div className="tablet:mt-[40px] mt-[24px] admin-detail-content">
          <QuillViewer content={post?.content} />
        </div>
      )}

      {/* 카테고리가 다운로드일 경우 첨부파일 목록 표시 */}
      {post?.files &&
        post.files.length > 0 &&
        post?.category === "Downloads" && (
          <div className="tablet:mt-[40px] mt-[24px] flex flex-col gap-y-3">
            {/* 첨부파일 제목 */}
            <p className="pretendard-subtitle-m">첨부파일</p>

            {/* 첨부파일 내용 */}
            <div className="w-full overflow-hidden rounded-xl border border-line-normal">
              <div className="flex w-full items-center justify-between bg-gray-100 px-4 py-3">
                {/* 파일명 */}
                <p className="text-label-normal pretendard-body-3">파일명</p>

                <div className="flex items-center gap-[32px]">
                  {/* 용량 */}
                  <p className="text-label-normal pretendard-body-3">용량</p>

                  {/* 전체 다운로드 버튼 */}
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    className="hover:opacity-80"
                  >
                    <Image
                      src="/svg/icon/download.svg"
                      alt="전체 다운로드"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </div>

              {/* 파일목록 */}
              <div>
                {post.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer justify-between px-4 py-3"
                  >
                    {/* 파일명 */}
                    <div className="flex w-[calc(100%-90px)] items-center">
                      <p className="line-clamp-1 tablet:max-w-none max-w-[140px] overflow-hidden truncate text-label-normal pretendard-body-3">
                        {file.fileName}
                      </p>
                    </div>

                    {/* 용량 및 다운로드 버튼 */}
                    <div className="flex items-center gap-[24px]">
                      {/* 용량 */}
                      <p className="whitespace-nowrap text-label-normal pretendard-body-3">
                        {formatBytes(file.fileSize)}
                      </p>

                      {/* 다운로드 버튼 */}
                      <button
                        className="relative size-[18px] overflow-hidden rounded-[2px] hover:opacity-80"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file.fileUrl, file.fileName);
                        }}
                      >
                        <Image
                          src="/svg/icon/download.svg"
                          alt="download"
                          width={18}
                          height={18}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </>
  );
}
