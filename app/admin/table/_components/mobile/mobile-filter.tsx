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
import { useState } from "react";
import CheckBox from "@/app/_components/check-box";
import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";

interface MobileFilterProps {
  totalCount: number;
  onFilterClick: () => void;
}

const POST_CATEGORIES = [
  { label: "전체", value: "all" },
  { label: "Tech Library", value: "LIBRARY" },
  { label: "Tech Insight", value: "INSIGHT" },
  { label: "DX Simulation", value: "DX" },
  { label: "Downloads", value: "DOWNLOADS" },
];

const MobileFilter = ({ totalCount, onFilterClick }: MobileFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  const handleDateChange = (newDate: searchDate) => {
    setDate(newDate);
  };

  const handleApply = () => {
    onFilterClick();
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

        <SheetContent side="bottom" className="h-[80vh] bg-white rounded-t-[12px]">
          <SheetHeader>
            <SheetTitle className="pretendard-title-m">필터 설정</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-6">
            {/* 생성 일자 필터 */}
            
            {/* 카테고리 필터 */}
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-white pt-[24px] pb-[40px] px-[16px]">
            <Button size="lg" className="text-white h-[59px] pretendard-subtitle-l" onClick={handleApply}>
              설정하기
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilter; 