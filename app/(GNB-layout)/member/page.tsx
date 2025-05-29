"use client";
import PageCrumble from "@/app/_components/page-crumble";
import MemberContainer from "./_components/member-container";
import Loading from "@/components/shared/loading/loading";

const MemberPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{ icon: "member", type: "original", path: "회원 관리" }}
      />
      <Loading>
        <MemberContainer />
      </Loading>
    </div>
  );
};
export default MemberPage;
