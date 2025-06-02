import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { PostCategory, PostsRequestParams } from "@/api/dto/post";
import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import FilterName from "@/app/_components/table/filter-name";
import formattedDate from "@/util/date";

const POST_CATEGORIES = [
  { label: "전체", value: "all" },
  { label: "Tech Library", value: "LIBRARY" },
  { label: "Tech Insight", value: "INSIGHT" },
  { label: "DX Simulation", value: "DX" },
  { label: "Downloads", value: "DOWNLOADS" },
];

interface FilterSearchBoxProps {
  onFilterChange: (params: PostsRequestParams) => void;
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const FilterSearchBox = ({
  onFilterChange,
  setSelectedIds,
}: FilterSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // 카테고리
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  useEffect(() => {
    setSelectedIds([]);
  }, [keyword]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setSelectedIds([]); // 선택된 체크박스 초기화
  };

  const getFilterParams = useCallback(
    (category: string, searchDate: searchDate): PostsRequestParams => {
      const params: PostsRequestParams = {
        page: 1,
        limit: 10,
        sortOrder: "DESC",
      };

      if (category !== "all") {
        params.category = category as PostCategory;
      }

      if (searchDate?.start && searchDate?.end) {
        params.startDate = formattedDate(searchDate.start, "INPUT_DATE");
        params.endDate = formattedDate(searchDate.end, "INPUT_DATE");
      }

      return params;
    },
    [],
  );

  useEffect(() => {
    const params = getFilterParams(selectedCategory, date);
    onFilterChange(params);
  }, [selectedCategory, date, onFilterChange, getFilterParams]);

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
        conditions={POST_CATEGORIES}
        handleChangeValue={handleCategoryChange}
      />
    </div>
  );
};

export default FilterSearchBox;
