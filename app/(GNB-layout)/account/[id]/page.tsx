"use client";
import PageCrumble from "@/app/_components/page-crumble";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import AccountDetailContainer from "./_components/notice-detail-container";

const AccountDetailTable = () => {
  const id = usePathname().split("/")[2];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "관리자 계정 상세" }} />
      <Loading>
        <AccountDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default AccountDetailTable;
