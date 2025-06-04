import { useState, useCallback } from "react";
import { PostCategory, PostsRequestParams } from "@/api/dto/post";
import { searchDate } from "@/app/_components/calendar-single";

interface UsePostFiltersReturn {
  category: string;
  date: searchDate;
  setCategory: (category: string) => void;
  setDate: (date: searchDate) => void;
  handleFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
  resetFilters: () => void;
}

const getDefaultDate = () => {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  return {
    start,
    end,
  };
};

export const usePostFilters = (
  onFilterChange: (filterParams: Partial<PostsRequestParams>) => void,
): UsePostFiltersReturn => {
  const [category, setCategory] = useState<string>("all");
  const [date, setDate] = useState<searchDate>(getDefaultDate());

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setCategory(newCategory);

      // API 필터 적용
      if (newCategory === "all") {
        onFilterChange({ category: undefined });
      } else {
        onFilterChange({ category: newCategory as PostCategory });
      }
    },
    [onFilterChange],
  );

  const handleFilterChange = useCallback(
    (filterParams: Partial<PostsRequestParams>) => {
      onFilterChange(filterParams);
    },
    [onFilterChange],
  );

  // 필터 초기화 핸들러
  const resetFilters = useCallback(() => {
    const defaultDate = getDefaultDate();
    setCategory("all");
    setDate(defaultDate);

    // API 필터 초기화
    const startDate = defaultDate.start.toISOString().split("T")[0];
    const endDate = defaultDate.end.toISOString().split("T")[0];

    onFilterChange({
      category: undefined,
      keyword: "",
      startDate,
      endDate,
    });
  }, [onFilterChange]);

  return {
    category,
    date,
    setCategory: handleCategoryChange,
    setDate,
    handleFilterChange,
    resetFilters,
  };
};
