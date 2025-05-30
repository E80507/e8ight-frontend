import { useEffect } from "react";
import ModalContainer from "./modal/modal-container";

interface MemberDetailModalProps {
  id: string; // 회원 ID
  onClickClose: () => void; // 모달창 닫기 핸들러
  isMemoTab: boolean; // 메모 탭 노출 여부
}

const MemberDetailModal = ({
  id,
  isMemoTab,
  onClickClose,
}: MemberDetailModalProps) => {
  // body overflow 설정
  useEffect(() => {
    // 모달이 열리면 body 스크롤을 막음
    document.body.style.overflow = "hidden";

    // 모달이 닫히면 body 스크롤을 다시 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70 px-5 py-[51px]">
      <div className="size-full max-w-[1668px] overflow-y-auto rounded-[20px] bg-white px-10 pb-10 hide-scroll-bar">
        <ModalContainer
          isMemoTab={isMemoTab}
          onClickClose={onClickClose}
          id={id}
        />
      </div>
    </div>
  );
};
export default MemberDetailModal;
