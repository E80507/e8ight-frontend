import { Button } from "@/components/ui/button";
import MemberTypeSwitch from "./member-type-switch";

interface ModalHeaderProps {
  isArtistTabOn: boolean; // 작가 정보 탭 노출 여부
  setIsArtistTab: (data: boolean) => void; // 작가 정보 탭 노출 여부 변경 함수
  isRegistered: boolean; // 작가 등록 여부
  onClickClose: () => void; // 모달창 닫기 핸들러
  onClickSave: () => void; // 폼 제출 핸들러
}

const ModalHeader = ({
  isArtistTabOn,
  isRegistered,
  onClickClose,
  setIsArtistTab,
  onClickSave,
}: ModalHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 flex items-start justify-between bg-white pb-8 pt-10">
      <div className="flex items-start gap-4 bg-white">
        <MemberTypeSwitch
          isRegistered={isRegistered}
          isArtistTabOn={isArtistTabOn}
          setIsArtistTab={setIsArtistTab}
        />
        <p className="heading-3">회원 정보 상세</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onClickClose} type="button" variant={"outline"}>
          목록으로
        </Button>
        <Button type="button" onClick={onClickSave}>
          저장하기
        </Button>
      </div>
    </div>
  );
};
export default ModalHeader;
