import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import { useCallback, useState } from "react";
import SearchBar from "./post-search-bar";
import { POST_CATEGORIES } from "@/constants/admin";
import { Post, PostCategory, PostsRequestParams } from "@/api/dto/post";
import Radio from "@/components/radio";

interface PostFilterBarProps {
  posts: Post[];
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (params: Partial<PostsRequestParams>) => void;
}

const PostFilterBar = ({
  posts,
  currentCategory,
  onCategoryChange,
  onFilterChange,
}: PostFilterBarProps) => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // 날짜 변경 핸들러
  const handleDateChange = useCallback((newDate: searchDate) => {
    setDate(newDate);

    if (newDate?.start && newDate?.end) {
      const startDate = new Date(newDate.start);
      startDate.setHours(9, 0, 0, 0);
      const endDate = new Date(newDate.end);
      endDate.setHours(9, 0, 0, 0);

      const startDateStr = startDate.toISOString().split("T")[0];
      const endDateStr = endDate.toISOString().split("T")[0];

      console.log("Date Debug PC:", {
        originalStart: startDate,
        originalEnd: endDate,
        formattedStart: startDateStr,
        formattedEnd: endDateStr,
      });

      onFilterChange({
        startDate: startDateStr,
        endDate: endDateStr,
      });
    }
  }, [onFilterChange]);

  return (
    <div className="border border-[#EEEFF1]">
      {/* 검색어 */}
      <div className="flex items-center bg-white">
        <div className="flex items-center py-[12px] px-[16px] w-[160px] min-h-[72px] bg-[#EEEFF1] pretendard-title-s">
          상세검색
        </div>

        <div className="px-[16px]">
          <SearchBar placeholder="제목, 저자" setKeyword={() => {}} />
        </div>
      </div>

      {/* 생성 일자 */}
      <div className="flex items-center bg-white border-t border-b border-[#EEEFF1]">
        <div className="flex items-center py-[12px] px-[16px] w-[160px] min-h-[72px] bg-[#EEEFF1] pretendard-title-s">
          생성 일자
        </div>

        <div className="px-[16px]">
          <CalendarDouble date={date} setDate={handleDateChange} />
        </div>
      </div>

      {/* 카테고리 */}
      <div className="flex items-center bg-white">
        <div className="flex items-center py-[12px] px-[16px] w-[160px] min-h-[72px] bg-[#EEEFF1] pretendard-title-s">
          카테고리
        </div>

        <div className="px-[16px] flex-1">
          <div className="flex flex-wrap gap-x-6">
            {POST_CATEGORIES.map((condition) => (
              <button
                key={condition.value}
                onClick={() => onCategoryChange(condition.value)}
                className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Radio isChecked={currentCategory === condition.value} />
                <span className="mt-px subtitle-m whitespace-nowrap">
                  {condition.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFilterBar;
