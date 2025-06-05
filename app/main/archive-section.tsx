"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import PdfDownloadModal from "../_components/modal/pdf-download-modal";
import { useRouter } from "next/navigation";
import { DOWNLOADS_PAGE } from "@/constants/path";
import { Post, PostsRequestParams } from "@/api/dto/post";
import { usePost } from "@/hooks/post/use-post";

const ArchiveSection = () => {
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [params] = useState<PostsRequestParams>({
    page: 1,
    limit: 2,
    sortOrder: "DESC",
    keyword: "",
    category: "DOWNLOADS",
  });

  const { posts = [] } = usePost(params);

  const onClickPdfDownload = (postId: string) => {
    setSelectedPostId(postId);
  };

  return (
    <section className="px-[16px] py-[80px] tablet:px-[30px] web:px-[120px] web:py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[24px] tablet:gap-[32px] web:gap-[40px]">
        <div className="pretendard-h1-r tablet:pretendard-h1-m web:pretendard-h1-l">
          자료실
        </div>

        <div className="grid grid-cols-1 gap-[16px] web:grid-cols-2 web:gap-[24px]">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="relative flex aspect-[1/1] flex-col justify-between overflow-hidden rounded-[20px] border p-[32px] tablet:aspect-[1.8/1] web:aspect-[1.39/1]"
            >
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
              <div className="absolute inset-0 z-0 bg-black opacity-[0.21]" />

              <div className="relative z-10 flex flex-col gap-[16px]">
                <Image
                  src="/svg/archive-logo.svg"
                  alt=""
                  width={68}
                  height={29}
                  className="-mt-px h-[29px] w-[68px]"
                  loading="lazy"
                />
                <div className="text-white pretendard-h1-m">{post.title}</div>
              </div>

              <Button
                size="lg"
                variant="outline"
                shape="round"
                className="relative z-10 ml-auto h-[37px] w-[120px] pretendard-title-s tablet:h-[48px] tablet:w-[160px]"
                onClick={() => onClickPdfDownload(post.id)}
              >
                PDF 다운로드
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            shape="round"
            className="h-[37px] w-[120px] pretendard-title-s tablet:h-[48px] tablet:w-[160px]"
            onClick={() => router.push(DOWNLOADS_PAGE)}
          >
            더보기
          </Button>
        </div>
      </div>

      {selectedPostId && (
        <PdfDownloadModal 
          postId={selectedPostId} 
          onClickClose={() => setSelectedPostId(null)} 
        />
      )}
    </section>
  );
};

export default ArchiveSection;
