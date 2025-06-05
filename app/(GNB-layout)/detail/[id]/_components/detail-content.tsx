"use client";

import { usePostDetail } from "@/hooks/post/use-post-detail";
// import PostHeader from "./post-header";
// import PostContent from "./post-content";
// import SocialLinks from "./social-links";
import SubscriptionBanner from "./subscription-banner";
import Image from "next/image";

interface DetailContentProps {
  params: { id: string };
}

const DetailContent = ({ params }: DetailContentProps) => {
  const { id } = params;
  const { post, isError, isLoading } = usePostDetail(id as string);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      {/* 게시물 썸네일 */}
      <div className="relative h-[173px] bg-gray-100 tablet:h-[299px]">
        <Image
          src={post.thumbnail}
          alt={post.title || "썸네일 이미지"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* <div className="mx-auto max-w-[1200px] px-[16px] py-[40px] tablet:px-[30px] tablet:py-[40px] web:px-0 web:py-[80px]">
        게시물 헤더
        <PostHeader post={post} />

        게시물 내용
        <PostContent post={post} />

        소셜 링크
        <SocialLinks />
      </div> */}

      {/* 구독 배너 */}
      <SubscriptionBanner />
    </div>
  );
};

export default DetailContent;
