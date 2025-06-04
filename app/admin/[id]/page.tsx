"use client";

import QuillViewer from "@/components/QuillViewer";
import { Button } from "@/components/ui/button";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import { useParams } from "next/navigation";

const AdminDetailPage = () => {
  const { id } = useParams();
  const { post, isLoading, isError } = usePostDetail(id as string);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러</div>;

  const showField = (field: string): boolean => {
    switch (post?.category) {
      case "LIBRARY":
      case "INSIGHT":
        return ["category", "author", "title", "content", "mainImage", "thumbnail", "tags", "keywords"].includes(field);
      case "DX":
        return ["category", "title", "thumbnail", "linkUrl"].includes(field);
      case "DOWNLOADS":
        return ["category", "title", "thumbnail", "files"].includes(field);
      default:
        return false;
    }
  };

  return (
    <div className="tablet:px-[120px] tablet:pt-[24px] tablet:pb-[40px] bg-white">
      <div className="justify-between h-[48px] hidden tablet:flex">
        <h3 className="pretendard-title-l">게시글 상세정보</h3>

        <div className="flex items-center gap-[8px]">
          <Button variant="outline" className="h-[48px] w-[97px]">삭제하기</Button>
          <Button className="h-[48px] w-[97px]">수정하기</Button>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="mt-[12px] border border-[#EEEFF1]">
        <div className="flex flex-col tablet:flex-row">
          <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
            카테고리
          </div>

          <div className="flex items-center px-[12px] pretendard-subtitle-s min-h-[45px]">
            {post?.category}
          </div>
        </div>

        {/* 저자 */}
        {showField("author") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              저자
            </div>
            
            <div className="flex items-center px-[12px] pretendard-subtitle-s min-h-[45px]">
              {post?.author}
            </div>
          </div>
        )}

        {/* 제목 */}
        <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
          <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
            제목
          </div>
          
          <div className="flex items-center px-[12px] pretendard-subtitle-s flex-1 min-h-[45px]">
            {post?.title}
          </div>
        </div>

        {/* 상세내용 */}
        {showField("content") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              상세내용
            </div>
            
            <div className="flex items-center px-[12px] pretendard-subtitle-s flex-1">
              <QuillViewer content={post?.content} />
            </div>
          </div>
        )}

        {/* 메인 이미지 */}
        {showField("mainImage") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              메인 이미지
            </div>
            
            <div className="flex items-center px-[20px] py-[16px] pretendard-subtitle-s flex-1">
              <div className="bg-gray-100 max-w-[442px] w-full tablet:h-[210px] h-[152px]"></div>
            </div>
          </div>
        )}

        {/* 썸네일 */}
        <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
          <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
            썸네일
          </div>
          
          <div className="flex items-center px-[20px] py-[16px] pretendard-subtitle-s flex-1">
            <div className="bg-gray-100 w-full tablet:h-[210px] h-[100px]"></div>
          </div>
        </div>

        {/* 태그 */}
        {showField("tags") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              태그
            </div>
            
            <div className="flex items-center gap-[8px] px-[16px] py-[12px] pretendard-subtitle-s flex-1">
              {post?.tags?.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-[16px] h-[40px] bg-[#F4F4F6] pretendard-body-2 rounded-[8px]"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 검색 키워드 */}
        {showField("keywords") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              검색 키워드
            </div>

            <div className="flex items-center px-[16px] py-[12px] pretendard-subtitle-s flex-1">
              {post?.keywords?.map((keyword: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-[16px] h-[40px] bg-[#F4F4F6] pretendard-body-2 rounded-[8px]"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 링크 연결 */}
        {showField("linkUrl") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              링크 연결
            </div>

            <div className="flex items-center px-[16px] py-[12px] pretendard-subtitle-s flex-1">
              {post?.linkUrl}
            </div>
          </div>
        )}

        {/* 첨부파일 */}
        {showField("files") && (
          <div className="flex flex-col tablet:flex-row border-b border-[#EEEFF1]">
            <div className="flex items-center px-[16px] tablet:w-[160px] w-full min-h-[45px] bg-[#EEEFF1] pretendard-body-3">
              첨부파일
            </div>

            <div className="flex items-center px-[16px] py-[12px] pretendard-subtitle-s flex-1">
              {post?.files}
            </div>
          </div>
        )}

        <div className="flex py-[40px] px-[16px] gap-[8px]">
          <Button variant="outline" className="flex-1 h-[48px] w-[97px]">삭제하기</Button>
          <Button className="flex-1 h-[48px] w-[97px]">수정하기</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailPage;