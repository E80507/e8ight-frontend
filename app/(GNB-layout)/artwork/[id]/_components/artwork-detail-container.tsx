import { useGetArtworkDetail } from "@/hooks/artwork/use-get-artwork-detail";
import TwoButtonBar from "@/app/_components/button/two-button-bar";
import { useRouter } from "next/navigation";
import { ARTWORK_PAGE } from "@/constants/path";
import ArtworkForm from "./artwork-form";
import { useRef } from "react";

interface ArtworkDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const ArtworkDetailContainer = ({ prev, id }: ArtworkDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${ARTWORK_PAGE}?prev=${prev}`);
  };
  const { data } = useGetArtworkDetail(id); // 작품 데이터
  const formRef = useRef<HTMLFormElement>(null); // 폼 제출을 위한 form 태그 참조 ref

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
      <ArtworkForm id={id} formRef={formRef} data={data} />
    </div>
  );
};
export default ArtworkDetailContainer;
