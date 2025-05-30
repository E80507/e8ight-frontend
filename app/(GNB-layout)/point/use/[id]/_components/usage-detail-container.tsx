import { useRouter } from "next/navigation";
import { POINT_USE_PAGE } from "@/constants/path";
import { Button } from "@/components/ui/button";
import { useGetPointUsageDetail } from "@/hooks/point/use-get-point-usage-detail";
import UsageBasicInfo from "./usage-basic-info";
import UsageDetailInfo from "./usage-detail-info";
import UsageStatusInfo from "./usage-status-info";

interface UsageDetailContainerProps {
  id: string; // 작품 id
  prev: string; // 이전 페이지
}

const UsageDetailContainer = ({ prev, id }: UsageDetailContainerProps) => {
  const router = useRouter();
  const onClickBack = () => {
    router.push(`${POINT_USE_PAGE}?prev=${prev}`);
  };
  const { data } = useGetPointUsageDetail(id);

  if (!data) return null;
  return (
    <div className="relative flex w-full flex-col gap-10">
      <div className="absolute right-0 top-0 mt-[-59px]">
        <Button onClick={onClickBack} variant={"outline"}>
          목록으로
        </Button>
      </div>
      <UsageBasicInfo data={data} />
      <UsageDetailInfo data={data} />
      <UsageStatusInfo data={data} />
    </div>
  );
};
export default UsageDetailContainer;
