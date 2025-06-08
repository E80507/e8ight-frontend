import { ListFilter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import { useState } from "react";
import { ADMIN_POST_CATEGORIES } from "@/constants/admin";
import { PostsRequestParams } from "@/app/api/dto/post";
import PostSearchBar from "./post-search-bar";

interface PostFilterBarProps {
  totalCount: number;
  category: string;
  date: searchDate;
  onCategoryChange: (category: string) => void;
  onDateChange: (date: searchDate) => void;
  onFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
  handleKeywordChange: (keyword: string) => void;
  resetFilters: () => void;
}

const PostFilterBar = ({
  totalCount,
  category,
  date,
  onCategoryChange,
  onDateChange,
  onFilterChange,
  handleKeywordChange,
  resetFilters,
}: PostFilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: searchDate) => {
    onDateChange(newDate);
  };

  // 현재 선택된 카테고리의 텍스트 값 찾기
  const selectedCategoryText =
    ADMIN_POST_CATEGORIES.find((c) => c.value === category)?.text || "전체";

  // 카테고리 변경 핸들러
  const handleCategoryChange = (text: string) => {
    const selectedCategory = ADMIN_POST_CATEGORIES.find((c) => c.text === text);
    if (selectedCategory) {
      onCategoryChange(selectedCategory.value);
    } else {
      onCategoryChange("all");
    }
  };

  // 필터 적용 핸들러
  const handleApply = () => {
    const filterParams: Partial<PostsRequestParams> = {};

    // 날짜 필터
    if (date?.start && date?.end) {
      const startDate = new Date(date.start);
      startDate.setHours(9, 0, 0, 0);
      const endDate = new Date(date.end);
      endDate.setHours(9, 0, 0, 0);

      const startDateStr = startDate.toISOString().split("T")[0];
      const endDateStr = endDate.toISOString().split("T")[0];

      filterParams.startDate = startDateStr;
      filterParams.endDate = endDateStr;
    }

    // API 필터 적용
    onFilterChange(filterParams);

    // Sheet 닫기
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <div className="flex items-center justify-between">
        <p className="pretendard-subtitle-m">총 {totalCount}건</p>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            {/* 필터 버튼 */}
            <button type="button" className="hover:opacity-80">
              <ListFilter />
            </button>
          </SheetTrigger>

          <SheetContent side="bottom" className="bg-white rounded-t-[12px]">
            {/* 헤더 */}
            <SheetHeader>
              <SheetTitle className="pretendard-title-m">필터 설정</SheetTitle>
            </SheetHeader>

            {/* 필터 컨테이너 */}
            <div className="mt-6 flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[24px]">
                {/* 생성 일자 필터 */}
                <div className="flex flex-col gap-[8px]">
                  <label className="pretendard-body-3 text-[#5E616E]">
                    생성 일자
                  </label>

                  <CalendarDouble
                    date={date}
                    setDate={handleDateChange}
                    className="w-full"
                  />
                </div>

                {/* 카테고리 필터 */}
                <div className="flex flex-col gap-[8px]">
                  <label className="pretendard-body-3 text-[#5E616E]">
                    카테고리
                  </label>
                  <select
                    value={selectedCategoryText}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full h-[48px] px-3 border rounded-sm focus:outline-none"
                  >
                    {ADMIN_POST_CATEGORIES.map((option) => (
                      <option key={option.value} value={option.text}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 적용 버튼 */}
              <SheetFooter>
                <div className="flex gap-[8px] w-full">
                  <Button className="flex-1" onClick={handleApply}>
                    적용하기
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 검색 바 */}
      <PostSearchBar
        placeholder="제목, 저자"
        setKeyword={handleKeywordChange}
        onReset={resetFilters}
      />
    </div>
  );
};

export default PostFilterBar;
