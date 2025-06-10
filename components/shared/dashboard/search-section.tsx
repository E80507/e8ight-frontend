"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchSectionProps {
  keyword: string;
  onSearch: (value: string) => void;
  text: string;
}

const SearchSection = ({ keyword, onSearch, text }: SearchSectionProps) => {
  const [inputValue, setInputValue] = useState(keyword);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue.trim());
    }
  };

  return (
    <section className="flex flex-col gap-y-[14px] font-pretendard tablet:gap-y-6">
      <p className=" break-words  subtitle-m tablet:subtitle-l">
        {text}디지털 자료를 자유롭게 찾아보세요.
      </p>
      <div className="relative flex h-[54px] w-full items-center">
        <Input
          variant="bottom-border"
          placeholder={"키워드를 입력해주세요."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon className="absolute inset-y-0 left-0 my-auto mr-4 size-6 text-gray-200" />
      </div>
    </section>
  );
};

export default SearchSection;
