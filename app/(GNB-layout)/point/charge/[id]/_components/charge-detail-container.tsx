import { useRouter } from "next/navigation";
import { POINT_CHARGE_PAGE } from "@/constants/path";
import { useGetPointChargeDetail } from "@/hooks/point/use-get-point-charge-detail";
import ChargeBasicInfo from "./charge-basic-info";
import ChargeDetailInfo from "./charge-detail-info";
import { Button } from "@/components/ui/button";
import ChargeStatusInfo from "./charge-status-info";

interface ChargeDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const ChargeDetailContainer = ({ prev, id }: ChargeDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${POINT_CHARGE_PAGE}?prev=${prev}`);
  };
  const { data } = useGetPointChargeDetail(id);

  if (!data) return null;
  return (
    <div className="relative flex w-full flex-col gap-10">
      <div className="absolute right-0 top-0 mt-[-59px]">
        <Button onClick={onClickBack} variant={"outline"}>
          목록으로
        </Button>
      </div>
      <ChargeBasicInfo data={data} />
      <ChargeDetailInfo data={data} />
      <ChargeStatusInfo data={data} />
    </div>
  );
};
export default ChargeDetailContainer;
