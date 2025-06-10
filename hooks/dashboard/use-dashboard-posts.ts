"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetchPostsBySearch, getPosts } from "@/app/api/dashboard";
import { usePathname } from "next/navigation";
import { POST_CATEGORY_VALUES } from "@/constants/admin";
import { useCallback } from "react";

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

export const useDashboardPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const pathname = usePathname();

  let category = "";
  let title = "";
  let text = "";
  if (pathname === "/tech-library") {
    category = POST_CATEGORY_VALUES.LIBRARY;
    title = "E8 Tech Library";
    text = "테크 라이브러리에서 궁금했던 ";
  } else if (pathname === "/tech-insight") {
    category = POST_CATEGORY_VALUES.INSIGHT;
    title = "E8 Tech Insight";
    text = "테크 인사이트에서 궁금했던 ";
  } else if (pathname === "/downloads") {
    category = POST_CATEGORY_VALUES.DOWNLOADS;
    title = "Downloads";
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width >= 1025 ? 9 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetcher = useCallback(
    async (
      keyword: string,
      page: number,
      limit: number,
      category: string,
    ): Promise<{ posts: Post[]; totalPages: number }> => {
      if (keyword) {
        return await fetchPostsBySearch({
          page,
          limit,
          category,
          keyword,
        });
      } else {
        return await getPosts({
          page,
          limit,
          category,
        });
      }
    },
    [],
  );

  // SWR key는 keyword, page, limit 조합
  const { data, mutate, isLoading, error } = useSWR(
    [keyword, currentPage, itemsPerPage, category],
    ([k, p, l, c]) => fetcher(k, p, l, c),
    { keepPreviousData: true },
  );

  const handleSearch = (value: string) => {
    if (keyword === value) return;
    setKeyword(value);
    setCurrentPage(1);
  };

  return {
    posts: data?.posts ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    mutate,
    title,
    text,
    handleSearch,
    currentPage,
    keyword,
    setCurrentPage,
  };
};
