import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface PostSearchBarProps {
  placeholder: string;
  setKeyword: (keyword: string) => void;
  onReset: () => void;
}

const PostSearchBar = ({
  placeholder,
  setKeyword,
  onReset,
}: PostSearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // 인풋 변경 핸들러
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 인풋 키 다운 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      setKeyword(inputValue);
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setInputValue("");
    onReset();
  };

  // 검색 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[8px] w-full"
    >
      {/* 검색 바 */}
      <div className="relative flex items-center w-[400px]">
        <SearchIcon className="absolute inset-y-0 left-0 my-auto ml-[16px] size-[24px] text-[#D6D7DC]" />

        <Input
          className="h-[48px] placeholder:text-[#A7A9B4] pretendard-body-2 pl-[44px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeValue}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 초기화 버튼 */}
      <Button
        type="button"
        variant={"outline"}
        size={"lg"}
        className="max-w-[84px]"
        onClick={handleReset}
      >
        초기화
      </Button>
    </form>
  );
};

export default PostSearchBar;
