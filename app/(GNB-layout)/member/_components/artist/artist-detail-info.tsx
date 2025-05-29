import { ArtistDetailRes } from "@/app/api/dto/member";
// import formattedDate from "@/util/date";
// import { handleStatusKRText } from "@/util/member";
// import FilterName from "@/app/_components/table/filter-name";
// import { RadioGroup } from "@radix-ui/react-radio-group";
// import { RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import ShortRow from "@/app/_components/table/short-row";

interface ArtistDetailInfoProps {
  data: ArtistDetailRes;
}
const ArtistDetailInfo = ({}: ArtistDetailInfoProps) => {
  // 상태 처리 진행일 텍스트
  // const statusUpdatedAt = data.statusUpdatedAt
  //   ? `${formattedDate(data.statusUpdatedAt, "INPUT_DATE")} / ${formattedDate(data.statusUpdatedAt)}`
  //   : "-";
  return (
    <div className="flex flex-col gap-2">
      <p className="heading-5">작가 상태 정보</p>
      {/* <div className="w-full max-w-[385px]">
        <ShortRow
          label="계정 상태"
          value={handleStatusKRText(data.status, true)}
        />
        <div className={`flex border-x border-t`}>
          <FilterName size="sm" name={"처리 상태"} />
          <div className="flex items-center px-5 text-black">
            <RadioGroup
              className="flex items-center gap-6"
              defaultValue={data.status}
            >
              <Label htmlFor={ArtistStatus.NORMAL}>
                <RadioGroupItem
                  id={ArtistStatus.NORMAL}
                  value={ArtistStatus.NORMAL}
                />
                <p>사용</p>
              </Label>
              <Label htmlFor={ArtistStatus.LOCK_DOWN}>
                <RadioGroupItem
                  id={ArtistStatus.LOCK_DOWN}
                  value={ArtistStatus.LOCK_DOWN}
                />
                <p>폐쇄</p>
              </Label>
            </RadioGroup>
          </div>
        </div>
        <ShortRow isLastRow label="처리 진행일" value={statusUpdatedAt} />
      </div> */}
    </div>
  );
};
export default ArtistDetailInfo;
