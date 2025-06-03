import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import { useState } from "react";
import SearchBar from "./post-search-bar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { POST_CATEGORIES } from "@/constants/admin";

const PostFilterBar = () => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });
  const [selected, setSelected] = useState(POST_CATEGORIES[0]?.value);

  const onChange = (val: string) => {
    if (!val) return; // 빈 문자열로 선택 해제되는 경우 방지
    setSelected(val);
    
    // 전체를 선택한 경우 필터링하지 않음
    if (val === "전체") {
      return;
    }
  };

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: searchDate) => {
    setDate(newDate);

    if (newDate?.start && newDate?.end) {
    }
  };

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
          <ToggleGroup
            value={selected}
            onValueChange={onChange}
            type="single"
            className="gap-x-[24px] flex-wrap"
          >
            {POST_CATEGORIES.map((condition) => (
              <ToggleGroupItem
                key={condition.value}
                hasIcon
                value={condition.value}
                aria-label={condition.value}
                className="w-fit justify-start"
              >
                <p className="mt-px subtitle-m whitespace-nowrap">{condition.value}</p>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default PostFilterBar;
