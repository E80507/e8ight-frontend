import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import { useCallback } from "react";
import { ADMIN_POST_CATEGORIES } from "@/constants/admin";
import { PostsRequestParams } from "@/app/api/dto/post";
import Radio from "@/components/radio";
import PostSearchBar from "./post-search-bar";

interface PostFilterBarProps {
  currentCategory: string;
  date: searchDate;
  onCategoryChange: (category: string) => void;
  onDateChange: (date: searchDate) => void;
  onFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
  handleKeywordChange: (keyword: string) => void;
  resetFilters: () => void;
}

const PostFilterBar = ({
  currentCategory,
  date,
  onCategoryChange,
  onDateChange,
  onFilterChange,
  handleKeywordChange,
  resetFilters,
}: PostFilterBarProps) => {
  // 날짜 변경 핸들러
  const handleDateChange = useCallback(
    (newDate: searchDate) => {
      onDateChange(newDate);

      // 시작일과 종료일이 모두 있을 때만 필터 적용
      if (newDate?.start && newDate?.end) {
        const startDate = new Date(newDate.start);
        startDate.setHours(9, 0, 0, 0);
        const endDate = new Date(newDate.end);
        endDate.setHours(9, 0, 0, 0);

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = endDate.toISOString().split("T")[0];

        onFilterChange({
          startDate: startDateStr,
          endDate: endDateStr,
        });
      }
    },
    [onDateChange, onFilterChange],
  );

  return (
    <div className="flex flex-col border border-[#EEEFF1]">
      {/* 검색어 */}
      <div className="flex h-[72px] bg-white">
        <div className="flex items-center px-[16px] w-[160px] bg-[#EEEFF1] pretendard-title-s">
          상세검색
        </div>

        {/* 검색어 컨테이너 */}
        <div className="flex-1 flex items-center px-[16px]">
          <PostSearchBar
            placeholder="제목, 저자"
            setKeyword={handleKeywordChange}
            onReset={resetFilters}
          />
        </div>
      </div>

      {/* 생성 일자 */}
      <div className="flex h-[72px] border-t border-b border-[#EEEFF1] bg-white">
        <div className="flex items-center px-[16px] w-[160px] bg-[#EEEFF1] pretendard-title-s">
          생성 일자
        </div>

        {/* 생성 일자 컨테이너 */}
        <div className="flex-1 flex items-center px-[16px]">
          <CalendarDouble date={date} setDate={handleDateChange} />
        </div>
      </div>

      {/* 카테고리 */}
      <div className="flex h-[72px] bg-white">
        <div className="flex items-center px-[16px] w-[160px] bg-[#EEEFF1] pretendard-title-s">
          카테고리
        </div>

        {/* 카테고리 버튼 컨테이너 */}
        <div className="flex-1 flex items-center px-[16px]">
          <div className="flex flex-wrap gap-x-6">
            {ADMIN_POST_CATEGORIES.map((condition) => (
              <button
                key={condition.value}
                type="button"
                onClick={() => onCategoryChange(condition.value)}
                className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Radio isChecked={currentCategory === condition.value} />

                <span className="mt-px pretendard-subtitle-m whitespace-nowrap">
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
