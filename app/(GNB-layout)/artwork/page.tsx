"use client";
import PageCrumble from "@/app/_components/page-crumble";
import ArtworkContainer from "./_components/artwork-container";
import Loading from "@/components/shared/loading/loading";

const FeedArtworkPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "feed",
          type: "original",
          path: "피드 관리",
          detailPath: "작품 목록",
        }}
      />
      <Loading>
        <ArtworkContainer />
      </Loading>
    </div>
  );
};
export default FeedArtworkPage;
