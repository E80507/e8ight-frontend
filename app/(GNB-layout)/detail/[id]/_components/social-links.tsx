"use client";

import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    icon: "linkedin",
    alt: "LinkedIn",
    link: "https://kr.linkedin.com/company/e8korea",
  },
  { icon: "blog", alt: "Blog", link: "https://blog.naver.com/e8korea" },
  { icon: "youtube", alt: "YouTube", link: "https://www.youtube.com/e8korea" },
  {
    icon: "instagram",
    alt: "Instagram",
    link: "https://www.instagram.com/e8_officialkr/",
  },
];

interface SocialLinksProps {
  withTitle?: boolean;
  inFooter?: boolean;
}

export default function SocialLinks({
  withTitle = true,
  inFooter = false,
}: SocialLinksProps) {
  return (
    <div
      className={`flex flex-col gap-[12px] tablet:gap-[24px] ${withTitle ? "mt-6 tablet:mt-10" : ""}`}
    >
      {/* 이에이트 SNS */}
      {withTitle && (
        <div className="text-[#A7A9B4] pretendard-subtitle-s tablet:pretendard-subtitle-l">
          이에이트 SNS
        </div>
      )}

      {/* 소셜 링크 */}
      <div className="flex items-center gap-[24px] tablet:gap-[40px]">
        {SOCIAL_LINKS.map((social) => (
          <Link
            key={social.icon}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className={`relative ${
                inFooter ? "size-7" : "size-6 tablet:size-7"
              }`}
            >
              <Image
                src={`/svg/icon/${social.icon}.svg`}
                alt={social.alt}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
