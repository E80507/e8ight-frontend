import { ArtistDetailRes, MemberRes } from "@/app/api/dto/member";
import { Form } from "@/components/ui/form";
import { usePatchUserInfo } from "@/hooks/member/use-patch-user-info";
import { RefObject, useState } from "react";
import ArtistBasicInfo from "./artist-basic-info";
import ArtistNavBarAndAllTabBox from "./artist-nav-bar-and-all-tab-box";

interface ArtistFormProps {
  data: ArtistDetailRes;
  savedUserData: MemberRes;
  id: string;
  formRef: RefObject<HTMLFormElement>;
}

export enum ARTIST_MODAL_TAB {
  ARTWORK = "ARTWORK",
  NOTICE = "NOTICE",
  PROFIT = "PROFIT",
  REPORT = "report",
  MEMO = "memo",
}
const ArtistForm = ({ id, formRef, data, savedUserData }: ArtistFormProps) => {
  const [currentTab, setCurrentTab] = useState(ARTIST_MODAL_TAB.ARTWORK);
  const { form, onSubmit } = usePatchUserInfo(id, savedUserData, true);

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <ArtistBasicInfo data={data} />
          </div>
          <ArtistNavBarAndAllTabBox
            userId={id}
            form={form}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            artistId={data.artistId}
          />
        </div>
      </form>
    </Form>
  );
};
export default ArtistForm;
