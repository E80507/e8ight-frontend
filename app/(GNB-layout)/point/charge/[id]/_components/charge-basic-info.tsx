import ShortRow from "@/app/_components/table/short-row";
import { PointChargeRes, TransactionPurpose } from "@/app/api/dto/point";
import formattedDate from "@/util/date";

interface ChargeBasicInfoProps {
  data: PointChargeRes;
}

const ChargeBasicInfo = ({ data }: ChargeBasicInfoProps) => {
  const transactionTypeText =
    data.purpose === TransactionPurpose.SIGNUP_RECHARGE
      ? "회원가입 충전"
      : "일반 충전";
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">충전 기본 정보</p>
      <div>
        <ShortRow
          size="md"
          label="포인트 충전 번호"
          value={data.transactionNo}
        />
        <ShortRow size="md" label="포인트 충전일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.transactionDate, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.transactionDate)}
            </span>
          </div>
        </ShortRow>
        <ShortRow size="md" label="충전 유형" value={transactionTypeText} />
        <ShortRow
          isLastRow
          size="md"
          label="충전한 회원 이메일"
          value={data.email}
        />
      </div>
    </div>
  );
};
export default ChargeBasicInfo;
