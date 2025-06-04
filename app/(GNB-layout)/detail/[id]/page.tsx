"use client";

import { useParams } from "next/navigation";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import PostHeader from "./_components/post-header";
import PostContent from "./_components/post-content";
import SocialLinks from "./_components/social-links";
import SubscriptionBanner from "./_components/subscription-banner";
import Image from "next/image";
import { isValidImageUrl } from "@/utils/image";

export default function DetailPage() {
  const { id } = useParams();
  const { post, isLoading, isError } = usePostDetail(id as string);

  const thumbnailSrc = post && isValidImageUrl(post.thumbnail) 
    ? post.thumbnail 
    : '/images/default-thumnail.webp';
    
  const mainImageSrc = post && isValidImageUrl(post.mainImage)
    ? post.mainImage
    : '/images/default-main-image.webp';

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      {/* 게시물 썸네일 */}
      <div className="tablet:h-[299px] h-[173px] relative bg-gray-100">
        <Image
          src={thumbnailSrc}
          alt={post?.title || '썸네일 이미지'}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="web:px-[120px] web:py-[80px] tablet:px-[30px] tablet:py-[40px] px-[16px] py-[40px] max-w-[1200px] mx-auto">
        {/* 게시물 헤더 */}
        <PostHeader post={post} />

        {/* 게시물 내용 */}
        <PostContent post={post} />

        {/* 게시물 메인 이미지 */}
        <div className="mt-[40px] max-w-[1200px] web:h-[571px] tablet:h-[458px] h-[156px] relative bg-gray-100">
          <Image
            src={mainImageSrc}
            alt={`${post?.title || '게시글'} 메인 이미지`}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* 소셜 링크 */}
        <SocialLinks />
      </div>

      {/* 구독 배너 */}
      <SubscriptionBanner />
    </div>
  );
}
