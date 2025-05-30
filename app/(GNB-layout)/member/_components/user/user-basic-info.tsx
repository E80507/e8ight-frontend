import { UserDetailRes, UserType } from "@/app/api/dto/member";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import formattedDate from "@/util/date";
import ShortRow from "@/app/_components/table/short-row";
import TooltipRow from "@/app/_components/table/tooltip-row";

interface UserBasicInfoProps {
  data: UserDetailRes;
}
const UserBasicInfo = ({ data }: UserBasicInfoProps) => {
  const recentOrderAt = data.recentOrderAt
    ? `${formattedDate(data.recentOrderAt, "INPUT_DATE")} / ${formattedDate(data.recentOrderAt)}`
    : "-";
  return (
    <div className="flex flex-col gap-2">
      <p className="heading-5">회원 기본 정보</p>
      <div className="w-full max-w-[385px]">
        <ShortRow label="회원번호" value={data.userNo} />
        <ShortRow
          label="회원유형"
          value={data.userType === UserType.ARTIST ? "작가" : "일반"}
        />
        <ShortRow
          label="회원 가입일"
          value={`${formattedDate(data.createdAt, "INPUT_DATE")} / ${formattedDate(data.createdAt)}`}
        />
        <ShortRow label="회원 닉네임" value={data.nickname} />
        <ShortRow label="회원 이메일" value={""}>
          <TooltipRow text={data.email} />
        </ShortRow>
        <ShortRow
          label="누적 주문횟수"
          value={`${handleCommaPrice(data.totalOrderCount)}회`}
        />
        <ShortRow
          label="누적 주문 포인트"
          value={handleCommaPoint(data.totalOrderAmount)}
        />
        <ShortRow label="최근 주문일" value={recentOrderAt} />
        <ShortRow
          label="로그인"
          value={`${handleCommaPrice(data.loginCount)}회`}
        />
        <ShortRow
          isLastRow
          label="보유 포인트"
          value={handleCommaPoint(data.pointBalance)}
        />
      </div>
    </div>
  );
};
export default UserBasicInfo;
