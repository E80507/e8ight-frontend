"use client";

import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  { icon: "linkedin", alt: "LinkedIn", link: "https://kr.linkedin.com/company/e8korea" },
  { icon: "blog", alt: "Blog", link: "https://blog.naver.com/e8korea" },
  { icon: "youtube", alt: "YouTube", link: "https://www.youtube.com/e8korea" },
  { icon: "instagram", alt: "Instagram", link: "https://www.instagram.com/e8_officialkr/" },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col tablet:gap-[24px] gap-[12px] tablet:mt-[40px] mt-[24px]">
      <div className="tablet:pretendard-subtitle-l pretendard-subtitle-s text-[#A7A9B4]">
        이에이트 SNS
      </div>

      <div className="flex items-center tablet:gap-[40px] gap-[24px]">
        {SOCIAL_LINKS.map((social) => (
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
  );
} 