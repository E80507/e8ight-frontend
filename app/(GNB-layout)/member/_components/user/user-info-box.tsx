import { UserDetailRes } from "@/app/api/dto/member";
import UserBasicInfo from "./user-basic-info";
import UserDetailInfo from "./user-detail-info";
import { RefObject, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { usePatchUserInfo } from "@/hooks/member/use-patch-user-info";
import UserNavBarAndAllTabBox from "./user-nav-bar-all-tab-box";

export enum USER_MODAL_TAB {
  POINT_CHARGE = "point-charge",
  POINT_USE = "point-use",
  DELIVERY = "delivery",
  REPORT = "report",
  MEMO = "memo",
}

const UserInfoBox = ({
  id,
  data,
  isMemoTab,
  formRef,
}: {
  id: string;
  data: UserDetailRes;
  isMemoTab: boolean;
  formRef: RefObject<HTMLFormElement>;
}) => {
  const [currentTab, setCurrentTab] = useState(USER_MODAL_TAB.POINT_CHARGE);
  const { form, onSubmit } = usePatchUserInfo(id, data, false);

  // 메모 탭 노출 여부 업데이트
  useEffect(() => {
    if (isMemoTab) {
      setCurrentTab(USER_MODAL_TAB.MEMO);
    }
  }, [isMemoTab]);
  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <UserBasicInfo data={data} />
            <UserDetailInfo form={form} data={data} />
          </div>
          <UserNavBarAndAllTabBox
            form={form}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            data={data}
          />
        </div>
      </form>
    </Form>
  );
};
export default UserInfoBox;
