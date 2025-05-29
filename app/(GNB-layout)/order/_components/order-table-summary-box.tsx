import TableSummaryText from "@/app/_components/table/table-summary-text";
import { OrderRes } from "@/app/api/dto/order";
import { Button } from "@/components/ui/button";
import { usePostDeliveryArtworkPDF } from "@/hooks/delivery/use-post-delivery-artwork-pdf";

interface OrderTableSummaryBoxProps {
  currentDataLen: number;
  totalData: OrderRes[];
  selectedIds: string[];
}

const OrderTableSummaryBox = ({
  currentDataLen,
  totalData,
  selectedIds,
}: OrderTableSummaryBoxProps) => {
  const { onSubmit, loading } = usePostDeliveryArtworkPDF();

  // PDF 다운로드 핸들러
  const onClickDownloadPDF = () => {
    const selectedData = totalData.filter((item) =>
      selectedIds.includes(item.purchasedArtworkId),
    );
    const uniqueCategories = new Set(
      selectedData.map((item) => item.printCategory),
    );

    // 서로 다른 printCategory가 존재할 경우
    if (uniqueCategories.size > 1) {
      return alert("PDF 출력은 굿즈 유형에 따른 개별 출력만 가능해요");
    }
    onSubmit(selectedIds);
  };
  return (
    <div className="flex items-center justify-between">
      <TableSummaryText
        currentDataLen={currentDataLen}
        totalDataLen={totalData.length}
      />
      <Button
        disabled={selectedIds.length === 0}
        type="button"
        className="min-w-[116px]"
        loadColor="white"
        loading={loading}
        onClick={onClickDownloadPDF}
        variant={"outline"}
        size={"sm"}
      >
        출력 PDF 다운로드
      </Button>
    </div>
  );
};
export default OrderTableSummaryBox;
