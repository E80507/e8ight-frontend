"use client";
import PageCrumble from "@/app/_components/page-crumble";
import ReportContainer from "./_components/report-container";
import Loading from "@/components/shared/loading/loading";

const FeedReportPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "feed",
          type: "original",
          path: "피드 관리",
          detailPath: "신고 목록",
        }}
      />
      <Loading>
        <ReportContainer />
      </Loading>
    </div>
  );
};
export default FeedReportPage;
