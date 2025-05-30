import AccountAddModal from "@/app/_components/modal/account-add-modal";
import PageCrumble from "@/app/_components/page-crumble";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AccountPageHeader = () => {
  const [modal, setModal] = useState(false);

  // 생성하기 핸들러
  const onClickAddAccount = () => {
    setModal(true);
  };
  return (
    <div className="flex items-center justify-between">
      {modal && <AccountAddModal onClickClose={() => setModal(false)} />}
      <PageCrumble
        props={{
          icon: "account",
          type: "original",
          path: "관리자 계정 관리",
        }}
      />
      <Button
        type="button"
        onClick={onClickAddAccount}
        className="max-w-max"
        variant={"pink"}
      >
        생성하기
      </Button>
    </div>
  );
};
export default AccountPageHeader;
