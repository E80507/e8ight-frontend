"use client";

import { GNB_EXTERNAL_LINKS } from "@/constants/service";
import Link from "next/link";

interface ExternalLinksNavProps {
  className?: string;
}

const ExternalLinksNav = ({ className }: ExternalLinksNavProps) => {
  return (
    <nav
      className={className || "flex justify-center gap-x-10 pretendard-body-3"}
    >
      {GNB_EXTERNAL_LINKS.map(({ label, href, target }) => (
        <Link
          key={label}
          href={href}
          target={target}
          className="text-label-normal transition-colors duration-300 ease-in-out hover:text-label-alternative active:text-black"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default ExternalLinksNav;
