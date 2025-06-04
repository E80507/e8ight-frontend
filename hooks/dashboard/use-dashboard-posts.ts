"use client";

import { useState, useEffect } from "react";
import { fetchPostsByTitle, getPosts } from "@/app/api/dashboard";

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
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const res = await getPosts({
        page: currentPage,
        limit: itemsPerPage,
      });
      setPosts(res.posts);
      setTotalPages(res.totalPages);
    };
    fetchInitialPosts();
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (value: string) => {
    const res = await fetchPostsByTitle({
      query: value,
      searchFields: ["TITLE"],
    });
    setPosts(res.posts);
    setCurrentPage(1);
    setTotalPages(res.totalPages);
    setKeyword(value);
  };

  return {
    keyword,
    setKeyword,
    handleSearch,
    posts,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
