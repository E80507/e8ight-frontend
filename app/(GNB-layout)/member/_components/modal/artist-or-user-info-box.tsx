import { UserDetailRes } from "@/app/api/dto/member";
import UserInfoBox from "../user/user-info-box";
import ArtistInfoBox from "../artist/artist-info-box";
import { RefObject } from "react";

interface ArtistOrUserInfoBoxProps {
  data: UserDetailRes; // 회원 상세 정보
  id: string; // 회원 ID
  isArtistTabOn: boolean; // 작가 정보 탭 노출 여부
  isMemoTab: boolean; // 메모 탭 노출 여부
  formRef: RefObject<HTMLFormElement>;
}

const ArtistOrUserInfoBox = ({
  data,
  id,
  isArtistTabOn,
  isMemoTab,
  formRef,
}: ArtistOrUserInfoBoxProps) => {
  return (
    <>
      {isArtistTabOn ? (
        <ArtistInfoBox formRef={formRef} savedUserData={data} id={id} />
      ) : (
        <UserInfoBox
          formRef={formRef}
          id={id}
          isMemoTab={isMemoTab}
          data={data}
        />
      )}
    </>
  );
};
export default ArtistOrUserInfoBox;
