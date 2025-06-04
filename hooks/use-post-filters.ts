import { useState, useCallback } from 'react';
import { PostCategory, PostsRequestParams } from "@/api/dto/post";
import { searchDate } from "@/app/_components/calendar-single";

interface UsePostFiltersReturn {
  category: string;
  date: searchDate;
  setCategory: (category: string) => void;
  setDate: (date: searchDate) => void;
  handleFilterChange: (filterParams: Partial<PostsRequestParams>) => void;
}

export const usePostFilters = (
  onFilterChange: (filterParams: Partial<PostsRequestParams>) => void
): UsePostFiltersReturn => {
  const [category, setCategory] = useState<string>("all");
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    
    // API 필터 적용
    if (newCategory === "all") {
      onFilterChange({ category: undefined });
    } else {
      onFilterChange({ category: newCategory as PostCategory });
    }
  }, [onFilterChange]);

  const handleFilterChange = useCallback((filterParams: Partial<PostsRequestParams>) => {
    onFilterChange(filterParams);
  }, [onFilterChange]);

  return {
    category,
    date,
    setCategory: handleCategoryChange,
    setDate,
    handleFilterChange,
  };
}; 