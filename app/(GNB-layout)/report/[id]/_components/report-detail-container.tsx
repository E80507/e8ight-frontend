import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { REPORT_PAGE } from "@/constants/path";
import { useGetReportDetail } from "@/hooks/report/use-get-report-detail";
import ReportForm from "./report-form";
import { useRef } from "react";

interface ReportDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const ReportDetailContainer = ({ prev, id }: ReportDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${REPORT_PAGE}?prev=${prev}`);
  };
  const { data } = useGetReportDetail(id);
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

  if (!data) return null;
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
      <ReportForm formRef={formRef} data={data} id={id} />
    </div>
  );
};
export default ReportDetailContainer;
