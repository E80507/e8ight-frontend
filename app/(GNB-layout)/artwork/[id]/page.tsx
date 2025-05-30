"use client";
import PageCrumble from "@/app/_components/page-crumble";
import ArtworkDetailContainer from "./_components/artwork-detail-container";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";

const ArtworkDetailPage = () => {
  const id = usePathname().split("/")[2];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "작품 정보 상세" }} />
      <Loading>
        <ArtworkDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default ArtworkDetailPage;
