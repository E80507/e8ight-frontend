"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetchPostsBySearch, getPosts } from "@/app/api/dashboard";

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  mainImage: string;
  tags: string[];
  keywords: string[];
  linkUrl: string;
  fileUrls: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

// fetcher 함수
const fetcher = async (
  keyword: string,
  page: number,
  limit: number,
): Promise<{ posts: Post[]; totalPages: number }> => {
  if (keyword) {
    return await fetchPostsBySearch({
      query: keyword,
      searchFields: ["TITLE", "KEYWORDS"],
      page,
      limit,
    });
  } else {
    return await getPosts({
      page,
      limit,
    });
  }
};

export const useDashboardPosts = () => {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width >= 1025 ? 9 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SWR key는 keyword, page, limit 조합
  const { data, mutate, isLoading, error } = useSWR(
    [keyword, currentPage, itemsPerPage],
    ([k, p, l]) => fetcher(k, p, l),
    { keepPreviousData: true },
  );

  // 검색 실행 시 keyword + page 초기화 → re-fetch 유도
  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  return {
    keyword,
    setKeyword,
    handleSearch,
    posts: data?.posts ?? [],
    currentPage,
    totalPages: data?.totalPages ?? 1,
    setCurrentPage,
    isLoading,
    error,
    mutate,
  };
};
