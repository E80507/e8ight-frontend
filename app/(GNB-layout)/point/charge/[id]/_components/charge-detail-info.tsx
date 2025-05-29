import ShortRow from "@/app/_components/table/short-row";
import { PointChargeRes, TransactionPurpose } from "@/app/api/dto/point";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChargeDetailInfoProps {
  data: PointChargeRes;
}

const ChargeDetailInfo = ({ data }: ChargeDetailInfoProps) => {
  const isSignUpCharge = data.purpose === TransactionPurpose.SIGNUP_RECHARGE; // 회원가입 충전 여부
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">충전 진행 정보</p>

      <div>
        <ShortRow
          isLastRow
          size="md"
          label="실제 지불 금액"
          value={isSignUpCharge ? "-" : handleCommaPrice(data.paidAmount, "원")}
        />
        <ShortRow
          isLastRow
          size="md"
          label="충전 금액"
          value={handleCommaPoint(data.amount)}
        />
        <ShortRow
          isLastRow
          size="md"
          label="충전 금액 잔여"
          value={handleCommaPoint(data.balance)}
        />
        <ShortRow isLastRow size="md" label="영수증 URL" value={""}>
          <div className="flex items-center gap-2">
            {data.receiptUrl ? (
              <Link href={data.receiptUrl} target="_blank">
                <Button variant={"outline-black"} size={"sm"}>
                  보기
                </Button>
              </Link>
            ) : (
              "-"
            )}
            <p>{data.receiptUrl}</p>
          </div>
        </ShortRow>
      </div>
    </div>
  );
};
export default ChargeDetailInfo;
