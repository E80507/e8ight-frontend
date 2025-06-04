"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Share2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import { shareUrl } from "@/utils/share";
import formattedDate from "@/util/date";
import QuillViewer from "@/components/QuillViewer";

const DetailPage = () => {
  const { id } = useParams();
  const { post, isLoading, isError } = usePostDetail(id as string);

  const handleShare = () => {
    shareUrl(post?.linkUrl);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      <div className="tablet:h-[299px] h-[173px] bg-gray-500"></div>

      <div className="web:px-[120px] web:py-[80px] tablet:px-[30px] tablet:py-[40px] px-[16px] py-[40px] max-w-[1200px] mx-auto">
        <div className="border-b border-[#EEEFF1] tablet:pb-[48px] pb-[24px]">
          <p className="tablet:pretendard-h1-l pretendard-h1-r">
            {post?.title}
          </p>

          <div className="flex items-center gap-[8px] mt-[16px] tablet:pretendard-body-2 pretendard-body-3 text-[#A7A9B4]">
            <span>{formattedDate(post?.createdAt, "INPUT_DATE")}</span>
            <span className="before:content-[''] before:inline-block before:w-[1px] before:h-[14px] before:bg-[#A7A9B4] before:mx-2"></span>
            <span>저자: {post?.author}</span>
          </div>

          <div className="flex items-center justify-between tablet:mt-[40px] mt-[24px]">
            <div className="flex flex-wrap gap-[8px]">
              {post?.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center px-[16px] py-[8px] tablet:h-[40px] h-[33px] rounded-[8px] tablet:pretendard-title-m pretendard-title-xs bg-[#F4F4F6]"
                >
                  {tag}
                </div>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="tablet:flex hidden items-center gap-[8px] px-[16px] py-[12px] bg-[#F9FAFA] border border-[#D6D7DC] rounded-[10px]"
            >
              <Share2Icon /> 공유하기
            </button>
          </div>
        </div>

        <div className="tablet:mt-[40px] mt-[24px]">
          <QuillViewer content={post?.content} />
        </div>

        <div className="flex flex-col tablet:gap-[24px] gap-[12px] tablet:mt-[40px] mt-[24px]">
          <div className="tablet:pretendard-subtitle-l pretendard-subtitle-s text-[#A7A9B4]">
            이에이트 SNS
          </div>

          <div className="flex items-center tablet:gap-[40px] gap-[24px]">
            {[
              { icon: "linkedin", alt: "LinkedIn", link: "https://kr.linkedin.com/company/e8korea" },
              { icon: "blog", alt: "Blog", link: "https://blog.naver.com/e8korea" },
              { icon: "youtube", alt: "YouTube", link: "https://www.youtube.com/e8korea" },
              { icon: "instagram", alt: "Instagram", link: "https://www.instagram.com/e8_officialkr/" },
            ].map((social) => (
              <Link 
                key={social.icon} 
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/svg/icon/${social.icon}.svg`}
                  alt={social.alt}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center relative tablet:h-[360px] h-[425px] overflow-hidden">
        <Image
          src="/images/subscription.webp"
          alt="Subscription background"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
          quality={90}
        />

        <div className="flex flex-col gap-[32px] tablet:flex-row tablet:justify-between tablet:text-left text-center items-center web:w-[1040px] w-full tablet:px-[30px]">
          <div className="flex flex-col gap-[8px]">
            <div className="relative tablet:gibson-heading-1 gibson-heading-2 text-white">
              Global No.1
              <br />
              Digital Twin Platform
            </div>

            <div className="relative tablet:gibson-heading-3 pretendard-subtitle-m text-white">
              The Evolution of Digital Transformation
            </div>
          </div>

          <Button
            variant="outline"
            shape={"round"}
            className="relative w-[200px] h-[59px]"
          >
            기술 문의
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
