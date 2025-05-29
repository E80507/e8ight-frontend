import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { SETTING_PAGE } from "@/constants/path";
import { useGetServiceNoticeDetail } from "@/hooks/setting/use-get-service-notice-detail";
import { useRef } from "react";
import ServiceNoticeForm from "./service-notice-form";

interface SettingDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const SettingDetailContainer = ({ prev, id }: SettingDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${SETTING_PAGE}?prev=${prev}`);
  };

  const { data } = useGetServiceNoticeDetail(id); // 기존 공지 데이터
  const formRef = useRef<HTMLFormElement>(null); // 폼 제출을 위한 form 태그 참조 ref

  if (!data) return null;

  // 저장하기 버튼 핸들러
  const onClickSave = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }
  };
  return (
    <div className="relative flex w-full flex-col gap-10">
      <div className="absolute right-0 top-0 mt-[-59px]">
        <TwoButtonBar
          firstBtnTxt="목록으로"
          secondBtnTxt="저장하기"
          onClickFirstBtn={onClickBack}
          onClickSecondBtn={onClickSave}
        />
      </div>
      <ServiceNoticeForm id={id} data={data} formRef={formRef} />
    </div>
  );
};
export default SettingDetailContainer;
