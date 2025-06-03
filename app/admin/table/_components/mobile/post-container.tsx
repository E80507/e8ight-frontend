import { useState, useEffect } from "react";
import { PostsRequestParams } from "@/api/dto/post";
import MobileListItem from "./post-item";
import { usePosts } from "@/hooks/posts/use-posts";
import Check from "@/components/shared/check";
import FloatingAddButton from "./post-add-button";
import PostSearchBar from "./post-search-bar";
import PostFilterBar from "./post-filter-bar";

const PostContainer = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [params, setParams] = useState<PostsRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: "DESC",
  });

  const { posts, totalCount, isLoading, error } = usePosts(params);

  // 전체 선택 여부 확인
  const isAllSelected =
    posts.length > 0 && posts.every((post) => selectedIds.includes(post.id));

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((post) => post.id));
    }
  };

  // 개별 선택/해제 핸들러
  const handleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleFilterClick = () => {
    setParams({
      ...params,
      page: 1,
    });
  };

  // 페이지 변경이나 필터 변경 시 선택 초기화
  useEffect(() => {
    setSelectedIds([]);
  }, [params]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div className="md:hidden flex flex-col gap-[16px] bg-white">
      {/* 검색 바 */}
      <PostSearchBar placeholder="제목, 저자" setKeyword={() => {}} />

      {/* 필터 버튼 */}
      <PostFilterBar
        totalCount={totalCount}
        onFilterClick={handleFilterClick}
      />

      {/* 선택 영역 */}
      <div className="flex items-center justify-between px-[16px]">
        <button type="button" className="flex items-center gap-[8px]">
          <div className="relative">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
            />
            <Check type="square" isChecked={isAllSelected} />
          </div>
          <p className="pretendard-subtitle-s">전체 선택</p>
        </button>

        <button
          type="button"
          className="text-[#A7A9B4] pretendard-body-3"
          onClick={() => {
            console.log("선택된 항목:", selectedIds);
          }}
        >
          선택 삭제
        </button>
      </div>

      {/* 게시물 리스트 */}
      <div>
        {posts.map((post, index) => (
          <MobileListItem
            post={post}
            key={post.id}
            isFirst={index === 0}
            isSelected={selectedIds.includes(post.id)}
            onSelect={() => handleSelectItem(post.id)}
          />
        ))}
      </div>

      {/* 추가 버튼 */}
      <FloatingAddButton />
    </div>
  );
};

export default PostContainer;
