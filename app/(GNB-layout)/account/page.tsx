"use client";
import Loading from "@/components/shared/loading/loading";
import AccountContainer from "./_components/account-container";
import AccountPageHeader from "./_components/account-page-header";

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <AccountPageHeader />
      <Loading>
        <AccountContainer />
      </Loading>
    </div>
  );
};
export default AccountPage;
