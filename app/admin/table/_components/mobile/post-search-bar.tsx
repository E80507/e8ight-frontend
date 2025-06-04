import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostSearchBarProps {
  placeholder: string;
  setKeyword: (keyword: string) => void;
}

const PostSearchBar = ({ placeholder, setKeyword }: PostSearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // 인풋 변경 핸들러
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setKeyword(inputValue);
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setInputValue("");
    setKeyword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-[8px]">
      <div className="relative flex items-center flex-1">
        <SearchIcon className="absolute inset-y-0 left-0 my-auto ml-[16px] size-[24px] text-[#D6D7DC]" />

        <Input
          className="h-[48px] placeholder:text-[#A7A9B4] pretendard-body-2 pl-[44px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeValue}
          onKeyDown={handleKeyDown}
        />
      </div>

      <Button
        type="button"
        variant={"outline"}
        size={"lg"}
        className="w-[84px]"
        onClick={handleReset}
      >
        초기화
      </Button>
    </form>
  );
};

export default PostSearchBar;
