import ShortRow from "@/app/_components/table/short-row";
import { PointUsageRes } from "@/app/api/dto/point";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";

interface UsageDetailInfoProps {
  data: PointUsageRes;
}

const UsageDetailInfo = ({ data }: UsageDetailInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">사용 진행 정보</p>

      <div>
        <ShortRow
          isLastRow
          size="md"
          label="구매한 작품번호"
          value={data.artworkNo ?? "-"}
        />
        <ShortRow
          isLastRow
          size="md"
          label="구매 수량"
          value={data.quantity ? handleCommaPrice(data.quantity, "장") : "-"}
        />
        <ShortRow
          isLastRow
          size="md"
          label="사용 금액"
          value={handleCommaPoint(data.amount)}
        />
        <ShortRow
          isLastRow
          size="md"
          label="사용 후 잔액"
          value={handleCommaPoint(data.balance)}
        />
      </div>
    </div>
  );
};
export default UsageDetailInfo;
