"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface SearchSectionProps {
  keyword: string;
  onSearch: (value: string) => void;
  setKeyword: (value: string) => void;
}

const SearchSection = ({
  keyword,
  onSearch,
  setKeyword,
}: SearchSectionProps) => {
  const pathname = usePathname();

  let text = "";
  if (pathname === "/tech-library") text = "테크 라이브러리에서 궁금했던 ";
  else if (pathname === "/tech-insight") text = "테크 인사이트에서 궁금했던 ";

  return (
    <section className="flex flex-col gap-y-[14px] font-pretendard tablet:gap-y-6">
      <p className=" break-words  subtitle-m tablet:subtitle-l">
        {text}디지털 자료를 자유롭게 찾아보세요.
      </p>
      <div className="relative flex h-[54px] w-full items-center">
        <Input
          variant="bottom-border"
          placeholder={"키워드 또는 내용을 입력해주세요."}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(keyword);
          }}
        />
        <SearchIcon className="absolute inset-y-0 left-0 my-auto mr-4 size-6 text-gray-200" />
      </div>
    </section>
  );
};

export default SearchSection;
