import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { NOTICE_PAGE } from "@/constants/path";
import { useGetNoticeDetail } from "@/hooks/notice/use-get-notice-detail";
import { useRef } from "react";
import NoticeForm from "./notice-form";

interface NoticeDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const NoticeDetailContainer = ({ prev, id }: NoticeDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${NOTICE_PAGE}?prev=${prev}`);
  };
  const { data } = useGetNoticeDetail(id);
  const formRef = useRef<HTMLFormElement>(null);

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
      <NoticeForm id={id} formRef={formRef} data={data} />
    </div>
  );
};
export default NoticeDetailContainer;
