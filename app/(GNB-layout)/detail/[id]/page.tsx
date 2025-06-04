"use client";

import { useParams } from "next/navigation";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import PostHeader from "./_components/post-header";
import PostContent from "./_components/post-content";
import SocialLinks from "./_components/social-links";
import SubscriptionBanner from "./_components/subscription-banner";

export default function DetailPage() {
  const { id } = useParams();
  const { post, isLoading, isError } = usePostDetail(id as string);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      <div className="tablet:h-[299px] h-[173px] bg-gray-500"></div>

      <div className="web:px-[120px] web:py-[80px] tablet:px-[30px] tablet:py-[40px] px-[16px] py-[40px] max-w-[1200px] mx-auto">
        <PostHeader post={post} />
        <PostContent post={post} />
        <SocialLinks />
      </div>

      <SubscriptionBanner />
    </div>
  );
}
