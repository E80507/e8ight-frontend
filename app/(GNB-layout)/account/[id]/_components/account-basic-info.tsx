import ShortRow from "@/app/_components/table/short-row";
import { AccountRes } from "@/app/api/dto/account";
import { AdminRole } from "@/app/api/dto/auth";
import { Button } from "@/components/ui/button";
import { usePatchAccountPassword } from "@/hooks/account/use-patch-account-password";
import useGetAdminInfo from "@/hooks/auth/use-get-admin-info";

interface AccountBasicInfoProps {
  data: AccountRes;
}

const AccountBasicInfo = ({ data }: AccountBasicInfoProps) => {
  const { onSubmit } = usePatchAccountPassword(data.id);
  const admin = useGetAdminInfo();
  const accountRoleText =
    data.role === AdminRole.ADMIN ? "일반 관리자" : "마스터 관리자";

  // admin 정보가 없을 경우 아무것도 노출하지 않음
  if (!admin) {
    return null;
  }

  // 마스터 관리자 여부
  const isSuperAdmin = admin.role === AdminRole.SUPER_ADMIN;

  // 비밀번호 초기화 핸들러
  const onClickResetPassword = () => {
    onSubmit();
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">관리자 정보</p>
      <div>
        <ShortRow size="md" label="이름" value={data.name} />
        <ShortRow size="md" label="아이디" value={data.loginId} />
        <ShortRow
          isLastRow={!isSuperAdmin}
          size="md"
          label="관리자 권한"
          value={accountRoleText}
        />
        {isSuperAdmin && (
          <ShortRow isLastRow size="md" label="비밀번호" value={""}>
            <Button
              onClick={onClickResetPassword}
              type="button"
              variant={"outline-black"}
              size={"sm"}
            >
              비밀번호 초기화
            </Button>
          </ShortRow>
        )}
      </div>
    </div>
  );
};
export default AccountBasicInfo;
