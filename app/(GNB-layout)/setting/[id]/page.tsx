"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import PageCrumble from "@/app/_components/page-crumble";
import SettingDetailContainer from "./_components/setting-detail-container";

const SettingDetailPage = () => {
  const id = usePathname().split("/")[2];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "서비스 공지 상세" }} />
      <Loading>
        <SettingDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default SettingDetailPage;
