import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { ADMIN_ACCOUNT_PAGE } from "@/constants/path";
import { useState } from "react";
import { useGetAccountDetail } from "@/hooks/account/use-get-account-detail";
import AccountBasicInfo from "./account-basic-info";
import { useDeleteAccount } from "@/hooks/account/use-delete-account-password";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";

interface AccountDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const AccountDetailContainer = ({ prev, id }: AccountDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${ADMIN_ACCOUNT_PAGE}?prev=${prev}`);
  };
  const { onSubmit, loading } = useDeleteAccount(id);
  const { data } = useGetAccountDetail(id);
  const [modal, setModal] = useState(false); // 관리자 계정 삭제 모달 노출 여부

  // 계정 삭제 성공 핸들러
  const handleSuccessOnDelete = () => {
    alert("계정이 삭제되었어요");
    router.replace(ADMIN_ACCOUNT_PAGE);
  };

  // 모달창 닫기 핸들러
  const handleCloseModal = () => setModal(false);

  // 계정 삭제 핸들러
  const handleDeleteAccount = () => {
    onSubmit(handleSuccessOnDelete);
  };

  if (!data) return null;
  return (
    <div className="relative flex w-full flex-col gap-10">
      {modal && (
        <TwoButtonModal
          loading={loading}
          title="관리자를 정말 삭제하시나요?"
          buttonText="삭제"
          onClickFirstBtn={handleCloseModal}
          onClickSecondBtn={handleDeleteAccount}
        />
      )}
      <div className="absolute right-0 top-0 mt-[-59px]">
        <TwoButtonBar
          firstBtnTxt="목록으로"
          secondBtnTxt="삭제하기"
          onClickFirstBtn={onClickBack}
          onClickSecondBtn={() => setModal(true)}
        />
      </div>
      <AccountBasicInfo data={data} />
    </div>
  );
};
export default AccountDetailContainer;
