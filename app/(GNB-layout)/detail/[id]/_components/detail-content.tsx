"use client";

import { usePostDetail } from "@/hooks/post/use-post-detail";
import PostHeader from "./post-header";
import PostContent from "./post-content";
import SocialLinks from "./social-links";
import SubscriptionBanner from "./subscription-banner";
import Image from "next/image";
import { useParams } from "next/navigation";

const DetailContent = () => {
  const { id } = useParams();
  console.log(id);
  const { post, isError } = usePostDetail(id as string);

  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
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

      <div className="tablet:px-[30px] tablet:py-[40px] web:px-0 web:py-[80px] mx-auto max-w-[1200px] px-[16px] py-[40px]">
        <PostHeader post={post} />
        <PostContent post={post} />
        <SocialLinks />
      </div>

      <SubscriptionBanner />
    </div>
  );
};

export default DetailContent;
