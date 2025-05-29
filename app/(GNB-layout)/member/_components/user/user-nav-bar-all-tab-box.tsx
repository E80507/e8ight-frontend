import Loading from "@/components/shared/loading/loading";
import ModalTabNavBar from "../modal/modal-tab-nav-bar";
import PointChargeBox from "../point/point-charge-box";
import PointUseBox from "../point/point-use-box";
import DeliveryBox from "../order/delivery-box";
import ReportBox from "../report/report-box";
import MemoBox from "./memo-box";
import { PatchUserInfoReq, UserDetailRes } from "@/app/api/dto/member";
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

interface UserNavBarAndAllTabBoxProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<USER_MODAL_TAB>>;
  data: UserDetailRes;
  form: UseFormReturn<PatchUserInfoReq>;
}

enum USER_MODAL_TAB {
  POINT_CHARGE = "point-charge",
  POINT_USE = "point-use",
  DELIVERY = "delivery",
  REPORT = "report",
  MEMO = "memo",
}

const USER_MODAL_TABS = [
  {
    label: "포인트 충전",
    value: USER_MODAL_TAB.POINT_CHARGE,
  },
  {
    label: "포인트 사용",
    value: USER_MODAL_TAB.POINT_USE,
  },
  {
    label: "배송",
    value: USER_MODAL_TAB.DELIVERY,
  },
  {
    label: "신고",
    value: USER_MODAL_TAB.REPORT,
  },
  {
    label: "메모",
    value: USER_MODAL_TAB.MEMO,
  },
];

const UserNavBarAndAllTabBox = ({
  currentTab,
  setCurrentTab,
  data,
  form,
}: UserNavBarAndAllTabBoxProps) => {
  return (
    <div className="relative flex w-full flex-col gap-6 overflow-hidden">
      <ModalTabNavBar
        type="user"
        props={{
          currentTab: currentTab,
          setCurrentTab: setCurrentTab,
          modalNavArray: USER_MODAL_TABS,
        }}
      />
      <Loading>
        {currentTab === USER_MODAL_TAB.POINT_CHARGE && (
          <PointChargeBox id={data.id} />
        )}
        {currentTab === USER_MODAL_TAB.POINT_USE && (
          <PointUseBox id={data.id} />
        )}
        {currentTab === USER_MODAL_TAB.DELIVERY && <DeliveryBox id={data.id} />}
        {currentTab === USER_MODAL_TAB.REPORT && (
          <ReportBox isArtist={false} id={data.id} />
        )}
        {currentTab === USER_MODAL_TAB.MEMO && <MemoBox form={form} />}
      </Loading>
    </div>
  );
};
export default UserNavBarAndAllTabBox;
