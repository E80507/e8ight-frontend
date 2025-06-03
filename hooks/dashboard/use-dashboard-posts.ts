"use client";

import { useState, useEffect } from "react";
import {
  // fetchPostsByTitle,
  // getPosts,
  mockFetchPostsByTitle,
  mockGetPosts,
} from "@/app/api/dashboard";

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
      const res = await mockGetPosts({
        page: currentPage,
        limit: itemsPerPage,
      });
      setPosts(
        res.posts.map(
          (post): Post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            thumbnail: post.thumbnail,
            category: post.category,
            author: post.author ?? "",
            mainImage: post.mainImage,
            tags: post.tags,
            keywords: post.keywords,
            linkUrl: post.linkUrl,
            fileUrls:
              "fileUrls" in post && Array.isArray(post.fileUrls)
                ? post.fileUrls
                : [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            deletedAt: post.deletedAt || "",
          }),
        ),
      );

      setTotalPages(res.totalPages);
    };
    fetchInitialPosts();
  }, [currentPage, itemsPerPage]);

  const handleSearch = async (value: string) => {
    const res = await mockFetchPostsByTitle({
      query: value,
      // searchFields: ["TITLE"], 실제 api에선 필요
    });
    setPosts(
      res.posts.map(
        (post): Post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          thumbnail: post.thumbnail,
          category: post.category,
          author: post.author ?? "",
          mainImage: post.mainImage,
          tags: post.tags,
          keywords: post.keywords,
          linkUrl: post.linkUrl,
          fileUrls:
            "fileUrls" in post && Array.isArray(post.fileUrls)
              ? post.fileUrls
              : [],
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          deletedAt: post.deletedAt || "",
        }),
      ),
    );

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
