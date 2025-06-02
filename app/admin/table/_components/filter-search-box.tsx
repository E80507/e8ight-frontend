import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { AdminRes } from "@/app/api/dto/admin";
import { ADMIN_CATEGORY_ARRAY } from "@/constants/admin";
import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import FilterName from "@/app/_components/table/filter-name";

interface FilterSearchBoxProps {
  data: AdminRes[]; // 전체 데이터
  setFilteredData: (data: AdminRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSelectedIds: Dispatch<SetStateAction<string[]>>; // 선택된 데이터 아이디 배열
}

const FilterSearchBox = ({
  data,
  setFilteredData,
  setCurrentPage,
  setSelectedIds,
}: FilterSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<string>("all"); // 카테고리
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // 카테고리 변경 핸들러
  const handleCheckAdminType = (val: string) => {
    setSelectedCategoryType(val);
    setSelectedIds([]); // 선택된 체크박스 초기화
  };

  const filterData = useCallback(() => {
    setCurrentPage(1); // 페이지 초기화
    let filtered = data;

    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerKeyword) ||
          item.writer.toLowerCase().includes(lowerKeyword),
      );
    }

    // 카테고리
    if (selectedCategoryType !== "all") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategoryType,
      );
    }

    // Date filtering
    if (date?.start && date?.end) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= date.start! && itemDate <= date.end!;
      });
    }

    setFilteredData(filtered);
  }, [keyword, selectedCategoryType, date, data, setFilteredData, setCurrentPage]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <div className="w-full">
      {/* 제목, 저자 */}
      <SearchBar placeholder="제목, 저자" setKeyword={setKeyword} />

      {/* 생성일자 */}
      <div className="flex h-[72px] border">
        <FilterName name="생성 일자" />

        <div className="relative flex w-[430px] items-center pl-[12px]">
          <CalendarDouble date={date} setDate={setDate} />
        </div>
      </div>

      {/* 카테고리 */}
      <CheckBox
        label={"카테고리"}
        conditions={ADMIN_CATEGORY_ARRAY}
        handleChangeValue={handleCheckAdminType}
      />
    </div>
  );
};

export default FilterSearchBox;
