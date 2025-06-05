"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchSectionProps {
  keyword: string;
  onSearch: (value: string) => void;
  setKeyword: (value: string) => void;
  text: string;
}

const SearchSection = ({
  keyword,
  onSearch,
  setKeyword,
  text,
}: SearchSectionProps) => {
  return (
    <section className="flex flex-col gap-y-[14px] font-pretendard tablet:gap-y-6">
      <p className=" break-words  subtitle-m tablet:subtitle-l">
        {text}디지털 자료를 자유롭게 찾아보세요.
      </p>
      <div className="relative flex h-[54px] w-full items-center">
        <Input
          variant="bottom-border"
          placeholder={"키워드를 입력해주세요."}
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
