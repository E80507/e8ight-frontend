import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface PostSearchBarProps {
  placeholder: string;
  setKeyword: (val: string) => void;
}

const PostSearchBar = ({ placeholder, setKeyword }: PostSearchBarProps) => {
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

  // 초기화 핸들러
  const handleReset = () => {
    setInputValue("");
    setKeyword("");
  };

  return (
    <div className="flex items-center gap-[8px]">
      <div className="relative flex items-center w-[400px]">
        <SearchIcon className="absolute inset-y-0 left-0 my-auto ml-[16px] size-[24px] text-[#D6D7DC]" />

        <Input
          className="h-[48px] placeholder:text-[#A7A9B4] pretendard-body-2 pl-[44px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeValue} // 입력값 업데이트
          onKeyDown={handleKeyDown} // Enter 키 감지
        />
      </div>

      <Button variant={"outline"} size={"lg"} className="max-w-[84px]" onClick={handleReset}>
        초기화
      </Button>
    </div>
  );
};

export default PostSearchBar;
