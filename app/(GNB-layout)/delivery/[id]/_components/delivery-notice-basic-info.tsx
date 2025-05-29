import ShortRow from "@/app/_components/table/short-row";
import { DeliveryDetailRes } from "@/app/api/dto/delivery";
import formattedDate from "@/util/date";
import { handleCommaPoint } from "@/util/price";

interface DeliveryBasicInfoProps {
  data: DeliveryDetailRes;
}

const DeliveryBasicInfo = ({ data }: DeliveryBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">배송 기본 정보</p>
      <div>
        <ShortRow size="md" label="배송 번호" value={data.deliveryNo} />
        <ShortRow size="md" label="배송 신청일" value={""}>
          <div className="flex gap-2">
            <span>
              {formattedDate(data.deliveryRequestedAt, "DEFAULT_FULL")}
            </span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.deliveryRequestedAt)}
            </span>
          </div>
        </ShortRow>
        <ShortRow
          isLastRow
          size="md"
          label="배송비 결제금액"
          value={handleCommaPoint(data.deliveryPrice)}
        />
      </div>
    </div>
  );
};
export default DeliveryBasicInfo;
