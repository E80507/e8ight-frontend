import { useGetArtistDetailInfo } from "@/hooks/member/use-get-artist-detail-info";
import ArtistForm from "./artist-form";
import { MemberRes } from "@/app/api/dto/member";
import { RefObject } from "react";

interface ArtistInfoBoxProps {
  id: string;
  savedUserData: MemberRes;
  formRef: RefObject<HTMLFormElement>;
}

const ArtistInfoBox = ({ id, formRef, savedUserData }: ArtistInfoBoxProps) => {
  const { data } = useGetArtistDetailInfo(id);
  if (!data) return null;
  return (
    <ArtistForm
      formRef={formRef}
      savedUserData={savedUserData}
      id={id}
      data={data}
    />
  );
};
export default ArtistInfoBox;
