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
import { POST_CATEGORIES } from "@/constants/admin";
import { PostsRequestParams, PostCategory } from "@/api/dto/post";

interface PostFilterBarProps {
  totalCount: number;
  onFilterChange: (params: Partial<PostsRequestParams>) => void;
}

const PostFilterBar = ({ totalCount, onFilterChange }: PostFilterBarProps) => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });
  const [category, setCategory] = useState<string>("전체");

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: searchDate) => {
    setDate(newDate);
  };

  // 필터 적용 핸들러
  const handleApply = () => {
    const filterParams: Partial<PostsRequestParams> = {};

    // 날짜 필터
    if (date?.start) {
      filterParams.startDate = date.start.toISOString();
    }
    if (date?.end) {
      filterParams.endDate = date.end.toISOString();
    }

    // 카테고리 필터
    if (category && category !== "전체") {
      const selectedCategory = POST_CATEGORIES.find(c => c.label === category);
      if (selectedCategory?.value) {
        filterParams.category = selectedCategory.value as PostCategory;
      }
    } else {
      filterParams.category = undefined;
    }

    onFilterChange(filterParams);
  };

  return (
    <div className="flex items-center justify-between px-[16px]">
      {/* 총 게시물 수 */}
      <p className="pretendard-subtitle-m">총 {totalCount}건</p>

      {/* 필터 시트 */}
      <Sheet>
        <SheetTrigger asChild>
          <button type="button" className="hover:opacity-80">
            <ListFilter />
          </button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="h-[80vh] bg-white rounded-t-[12px]"
        >
          <SheetHeader>
            <SheetTitle className="pretendard-title-m">필터 설정</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[24px]">
              {/* 생성 일자 필터 */}
              <div className="flex flex-col gap-[8px]">
                <label className="pretendard-body-3 text-[#5E616E]">생성 일자</label>
                <CalendarDouble date={date} setDate={handleDateChange} className="w-full" />
              </div>

              {/* 카테고리 필터 */}
              <div className="flex flex-col gap-[8px]">
                <label className="pretendard-body-3 text-[#5E616E]">카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-[48px] px-3 border rounded-sm focus:outline-none"
                >
                  {POST_CATEGORIES.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 설정하기 버튼 */}
          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-white pt-[24px] pb-[40px] px-[16px]">
            <Button
              size="lg"
              className="text-white w-full h-[59px] pretendard-subtitle-l"
              onClick={handleApply}
            >
              설정하기
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PostFilterBar;
