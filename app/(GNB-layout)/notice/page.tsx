"use client";
import PageCrumble from "@/app/_components/page-crumble";
import NoticeContainer from "./_components/notice-container";
import Loading from "@/components/shared/loading/loading";

const FeedNoticePage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "feed",
          type: "original",
          path: "피드 관리",
          detailPath: "공지 목록",
        }}
      />
      <Loading>
        <NoticeContainer />
      </Loading>
    </div>
  );
};
export default FeedNoticePage;
