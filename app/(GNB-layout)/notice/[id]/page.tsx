"use client";
import PageCrumble from "@/app/_components/page-crumble";

import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import NoticeDetailContainer from "./_components/notice-detail-container";

const NoticeDetailPage = () => {
  const id = usePathname().split("/")[2];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "공지 정보 상세" }} />
      <Loading>
        <NoticeDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default NoticeDetailPage;
