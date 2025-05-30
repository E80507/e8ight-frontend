import { useRef, useState } from "react";
import ModalHeader from "./modal-header";
import ArtistOrUserInfoBox from "./artist-or-user-info-box";
import { useGetUserDetailInfo } from "@/hooks/member/use-get-user-detail-info";
import { UserType } from "@/app/api/dto/member";
import Loading from "@/components/shared/loading/loading";

interface ModalContainerProps {
  id: string; // 회원 ID
  onClickClose: () => void; // 모달창 닫기 핸들러
  isMemoTab: boolean; // 메모 탭 노출 여부
}

const ModalContainer = ({
  onClickClose,
  isMemoTab,
  id,
}: ModalContainerProps) => {
  const [isArtistTabOn, setIsArtistTab] = useState(false); // 작가 정보 탭 노출 여부
  const { data } = useGetUserDetailInfo(id);
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
    <div className="flex flex-col">
      <ModalHeader
        onClickSave={onClickSave}
        onClickClose={onClickClose}
        isRegistered={data.userType === UserType.ARTIST}
        isArtistTabOn={isArtistTabOn}
        setIsArtistTab={setIsArtistTab}
      />
      <Loading>
        <ArtistOrUserInfoBox
          formRef={formRef}
          isMemoTab={isMemoTab}
          data={data}
          id={id}
          isArtistTabOn={isArtistTabOn}
        />
      </Loading>
    </div>
  );
};
export default ModalContainer;
