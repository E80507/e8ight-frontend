"use client";

import { GNB_EXTERNAL_LINKS } from "@/constants/service";
import Link from "next/link";

interface ExternalLinksNavProps {
  className?: string;
}

const ExternalLinksNav = ({ className }: ExternalLinksNavProps) => {
  return (
    <nav
      className={
        className || "flex justify-center gap-x-10 text-label-normal body-3"
      }
    >
      {GNB_EXTERNAL_LINKS.map(({ label, href, target }) => (
        <Link key={label} href={href} target={target}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default ExternalLinksNav;
