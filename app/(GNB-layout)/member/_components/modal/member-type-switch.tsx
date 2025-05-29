import { Switch } from "@/components/ui/switch";

interface MemberTypeSwitchProps {
  isArtistTabOn: boolean; // 작가 정보 탭 노출 여부
  setIsArtistTab: (data: boolean) => void; // 작가 정보 탭 노출 여부 변경 함수
  isRegistered: boolean; // 작가 등록 여부
}

const MemberTypeSwitch = ({
  isArtistTabOn,
  isRegistered,
  setIsArtistTab,
}: MemberTypeSwitchProps) => {
  return (
    <div className="relative flex">
      <Switch
        onClick={() => setIsArtistTab(!isArtistTabOn)}
        disabled={!isRegistered}
        data-state={isArtistTabOn ? "checked" : "unchecked"}
        isChecked={isArtistTabOn}
        id="airplane-mode"
      />
    </div>
  );
};
export default MemberTypeSwitch;
