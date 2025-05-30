import { ArtistDetailRes } from "@/app/api/dto/member";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import formattedDate from "@/util/date";
import Image from "next/image";
import ShortRow from "@/app/_components/table/short-row";

interface ArtistBasicInfoProps {
  data: ArtistDetailRes;
}
const ArtistBasicInfo = ({ data }: ArtistBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="heading-5">작가 기본 정보</p>
      <div className="w-full max-w-[385px]">
        <ShortRow label="작가 ID" value={data.artistId} />
        <ShortRow label="작가 닉네임" value={data.nickname} />
        <ShortRow
          label="작가 등록일"
          value={`${formattedDate(data.createdAt, "INPUT_DATE")} / ${formattedDate(data.createdAt)}`}
        />
        <div className={`flex border-x border-t`}>
          <p
            className={`flex w-[154px] items-center border-r bg-gray-100 px-5 subtitle-3`}
          >
            프로필 이미지
          </p>
          <Image
            src={data.profileImage}
            alt="프로필 이미지"
            width={59}
            height={89}
            className="mx-auto my-[9px] h-[89px] w-[59px] border object-cover"
          />
        </div>
        <ShortRow
          label="구독자 수"
          value={`${handleCommaPrice(data.subscriberCount)}명`}
        />
        <ShortRow
          label="누적 신고횟수"
          value={`${handleCommaPrice(data.reportCount)}회`}
        />
        <ShortRow
          label="올해 매출"
          value={handleCommaPoint(data.thisYearRevenue)}
        />
        <ShortRow
          isLastRow
          label="총 매출"
          value={handleCommaPoint(data.totalRevenue)}
        />
      </div>
    </div>
  );
};
export default ArtistBasicInfo;
