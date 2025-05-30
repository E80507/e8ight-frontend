import Loading from "@/components/shared/loading/loading";
import ModalTabNavBar from "../modal/modal-tab-nav-bar";
import ReportBox from "../report/report-box";
import { PatchUserInfoReq } from "@/app/api/dto/member";
import { UseFormReturn } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import MemoBox from "../user/memo-box";
import ArtworkBox from "../artwork/artwork-box";
import NoticeBox from "../notice/notice-box";
import ProfitBox from "../profit/profit-box";

interface ArtistNavBarAndAllTabBoxProps {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<ARTIST_MODAL_TAB>>;
  form: UseFormReturn<PatchUserInfoReq>;
  userId: string;
  artistId: string;
}

enum ARTIST_MODAL_TAB {
  ARTWORK = "ARTWORK",
  NOTICE = "NOTICE",
  PROFIT = "PROFIT",
  REPORT = "report",
  MEMO = "memo",
}

const ARTIST_MODAL_TABS = [
  {
    label: "작품",
    value: ARTIST_MODAL_TAB.ARTWORK,
  },
  {
    label: "공지",
    value: ARTIST_MODAL_TAB.NOTICE,
  },
  {
    label: "수익",
    value: ARTIST_MODAL_TAB.PROFIT,
  },
  {
    label: "신고",
    value: ARTIST_MODAL_TAB.REPORT,
  },
  {
    label: "메모",
    value: ARTIST_MODAL_TAB.MEMO,
  },
];

const ArtistNavBarAndAllTabBox = ({
  currentTab,
  setCurrentTab,
  form,
  userId,
  artistId,
}: ArtistNavBarAndAllTabBoxProps) => {
  return (
    <div className="relative flex w-full flex-col gap-6 overflow-hidden">
      <ModalTabNavBar
        type="artist"
        props={{
          currentTab: currentTab,
          setCurrentTab: setCurrentTab,
          modalNavArray: ARTIST_MODAL_TABS,
        }}
      />

      <Loading>
        {currentTab === ARTIST_MODAL_TAB.ARTWORK && <ArtworkBox id={userId} />}
        {currentTab === ARTIST_MODAL_TAB.NOTICE && (
          <NoticeBox artistId={artistId} />
        )}
        {currentTab === ARTIST_MODAL_TAB.PROFIT && <ProfitBox id={userId} />}
        {currentTab === ARTIST_MODAL_TAB.REPORT && (
          <ReportBox isArtist={true} id={userId} />
        )}
        {currentTab === ARTIST_MODAL_TAB.MEMO && <MemoBox form={form} />}
      </Loading>
    </div>
  );
};
export default ArtistNavBarAndAllTabBox;
