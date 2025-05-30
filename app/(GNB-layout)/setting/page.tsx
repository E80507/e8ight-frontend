"use client";
import PageCrumble from "@/app/_components/page-crumble";
import SettingContainer from "./_components/setting-container";
import Loading from "@/components/shared/loading/loading";

const SettingPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "setting",
          type: "original",
          path: "기본 관리",
          detailPath: "서비스 공지 목록",
        }}
      />
      <Loading>
        <SettingContainer />
      </Loading>
    </div>
  );
};
export default SettingPage;
