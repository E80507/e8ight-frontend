import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { Post, PostCategory, PostsRequestParams } from "@/api/dto/post";
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
  posts: Post[];
  onSearch: (filteredPosts: Post[]) => void;
}

const FilterSearchBox = ({
  onFilterChange,
  setSelectedIds,
  posts,
  onSearch,
}: FilterSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // 카테고리
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // 검색어
  const filterData = useCallback(() => {
    let filtered = posts;

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerKeyword) ||
          (item.author?.toLowerCase() ?? "").includes(lowerKeyword),
      );
    }

    onSearch(filtered);
  }, [keyword, posts, onSearch]);

  // 검색어 변경시 필터링 실행
  useEffect(() => {
    filterData();
    setSelectedIds([]);
  }, [keyword, filterData, setSelectedIds]);

  const getFilterParams = useCallback(
    (category: string, searchDate: searchDate): PostsRequestParams => {
      const params: PostsRequestParams = {
        page: 1,
        limit: 10,
        sortOrder: "DESC",
      };

      if (category && category !== "all") {
        params.category = category as PostCategory;
      } else {
        params.category = undefined;
      }

      if (searchDate?.start && searchDate?.end) {
        params.startDate = formattedDate(searchDate.start, "INPUT_DATE");
        params.endDate = formattedDate(searchDate.end, "INPUT_DATE");
      }

      return params;
    },
    [],
  );

  // 카테고리 변경 핸들러
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    const params = getFilterParams(val, date);
    onFilterChange(params);
    setSelectedIds([]); // 선택된 체크박스 초기화
  };

  // 날짜 변경시 API 호출
  useEffect(() => {
    const params = getFilterParams(selectedCategory, date);
    onFilterChange(params);
  }, [date, selectedCategory, getFilterParams, onFilterChange]);

  return (
    <div className="w-full">
      <SearchBar placeholder="제목, 저자" setKeyword={setKeyword} />

      <div className="flex h-[72px] border">
        <FilterName name="생성 일자" />
        <div className="relative flex w-[430px] items-center pl-[12px]">
          <CalendarDouble date={date} setDate={setDate} />
        </div>
      </div>

      <CheckBox
        label={"카테고리"}
        conditions={POST_CATEGORIES}
        handleChangeValue={handleCategoryChange}
      />
    </div>
  );
};

export default FilterSearchBox;
