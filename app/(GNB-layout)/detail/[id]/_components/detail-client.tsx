"use client";

import { usePostDetail } from "@/hooks/post/use-post-detail";
import PostHeader from "./post-header";
import PostContent from "./post-content";
import SocialLinks from "./social-links";
import SubscriptionBanner from "./subscription-banner";
import Image from "next/image";
import Loading from "@/components/shared/loading/loading";

interface DetailClientProps {
  params: { id: string };
}

const DetailClient = ({ params }: DetailClientProps) => {
  const { id } = params;
  const { post, isError } = usePostDetail(id as string);

  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!post) return <Loading />;

  return (
    <>
      {/* 썸네일 */}
      {post.thumbnail && (
        <div className="tablet:h-[299px] relative h-[173px] bg-gray-100">
          <Image
            src={post.thumbnail}
            alt={post.title || "썸네일 이미지"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-[1440px] web:px-[120px] tablet:px-[30px] tablet:py-[40px] web:py-[80px] mx-auto px-[16px] py-[40px]">
        {/* 헤더 */}
        <PostHeader post={post} />

        {/* 내용 */}
        <PostContent post={post} />

        {/* 소셜 링크 */}
        <SocialLinks />
      </div>

      {/* 구독 배너 */}
      <SubscriptionBanner />
    </>
  );
};

export default DetailClient;
