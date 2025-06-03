import CalendarDouble, { searchDate } from "@/app/_components/calendar-single";
import { useState } from "react";
import SearchBar from "./post-search-bar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { POST_CATEGORIES } from "@/constants/admin";
import { Post, PostCategory, PostsRequestParams } from "@/api/dto/post";

interface PostFilterBarProps {
  posts: Post[];
  onFilteredDataChange: (filteredPosts: Post[]) => void;
  onFilterChange: (params: Partial<PostsRequestParams>) => void;
}

const PostFilterBar = ({ posts, onFilteredDataChange, onFilterChange }: PostFilterBarProps) => {
  const [selected, setSelected] = useState(POST_CATEGORIES[0].value);
  const [searchTerm, setSearchTerm] = useState("");

  // 검색어 변경 핸들러
  const handleSearch = (keyword: string) => {
    setSearchTerm(keyword);
    filterPosts(keyword, selected);
  };

  // 카테고리 변경 핸들러
  const onChangeCategory = (category: string) => {
    if (!category) return;
    setSelected(category);
    filterPosts(searchTerm, category);

    // API 필터링을 위한 카테고리 값 전달
    if (category === POST_CATEGORIES[0].value) {  // "전체" 카테고리인 경우
      onFilterChange({ category: undefined });
    } else {
      onFilterChange({ category: category as PostCategory });
    }
  };

  // 필터링 로직
  const filterPosts = (keyword: string, category: string) => {
    let filtered = [...posts];

    // 검색어 필터링
    if (keyword) {
      const searchLower = keyword.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchLower) ||
          post.author?.toLowerCase().includes(searchLower)
      );
    }

    console.log("filtered 뭐지", filtered);

    onFilteredDataChange(filtered);
  };

  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: searchDate) => {
    setDate(newDate);

    if (newDate?.start && newDate?.end) {
      // timezone 보정을 위해 시간을 설정
      const startDate = new Date(newDate.start);
      startDate.setHours(9, 0, 0, 0);
      const endDate = new Date(newDate.end);
      endDate.setHours(9, 0, 0, 0);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      console.log('Date Debug PC:', {
        originalStart: startDate,
        originalEnd: endDate,
        formattedStart: startDateStr,
        formattedEnd: endDateStr
      });

      onFilterChange({
        startDate: startDateStr,
        endDate: endDateStr
      });
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
          <SearchBar 
            placeholder="제목, 저자" 
            setKeyword={handleSearch}
          />
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
            onValueChange={onChangeCategory}
            type="single"
            className="gap-x-[24px] flex-wrap"
          >
            {POST_CATEGORIES.map((condition) => (
              <ToggleGroupItem
                key={condition.value}
                hasIcon
                value={condition.value}
                aria-label={condition.text}
                className="w-fit justify-start"
              >
                <p className="mt-px subtitle-m whitespace-nowrap">
                  {condition.text}
                </p>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default PostFilterBar;
