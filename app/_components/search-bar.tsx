import { useState } from "react";
import { Input } from "@/components/ui/input";
import FilterName from "./table/filter-name";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder: string;
  setKeyword: (val: string) => void;
}

const SearchBar = ({ placeholder, setKeyword }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // 인풋 변경 핸들러
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("inputValue", inputValue);
      setKeyword(inputValue); // 검색어 전달
    }
  };

  return (
    <div className="flex h-[72px] border border-[#EEEFF1]">
      <FilterName name="상세 검색" />
      
      <div className="flex items-center gap-2">
        <div className="relative flex w-[430px] items-center pl-[12px]">
          <SearchIcon className="absolute inset-y-0 left-0 my-auto ml-[26px] size-6 text-[#D6D7DC]" />

          <Input
            className="h-[48px] placeholder:text-[#A7A9B4] pretendard-body-2 pl-[46px]"
            placeholder={placeholder}
            value={inputValue}
            onChange={onChangeValue} // 입력값 업데이트
            onKeyDown={handleKeyDown} // Enter 키 감지
          />
        </div>

        <Button variant={"outline"} size={"lg"} className="w-[84px]">초기화</Button>  
      </div>
    </div>
  );
};

export default SearchBar;
