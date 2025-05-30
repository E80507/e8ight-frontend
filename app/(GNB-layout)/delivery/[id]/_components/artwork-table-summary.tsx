import TableSummaryText from "@/app/_components/table/table-summary-text";
import { DeliveryArtwork } from "@/app/api/dto/delivery";
import { Button } from "@/components/ui/button";
import { usePostDeliveryArtworkPDF } from "@/hooks/delivery/use-post-delivery-artwork-pdf";

interface ArtworkTableSummaryProps {
  data: DeliveryArtwork[];
  selectedIds: string[]; // 선택된 아이디 배열
}

const ArtworkTableSummary = ({
  data,
  selectedIds,
}: ArtworkTableSummaryProps) => {
  const { onSubmit, loading } = usePostDeliveryArtworkPDF();

  // PDF 다운로드 핸들러
  const onClickDownloadPDF = () => {
    const selectedData = data.filter((item) => selectedIds.includes(item.id));
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
    <div className="flex justify-between">
      <TableSummaryText
        currentDataLen={data.length}
        totalDataLen={data.length}
      />
      <Button
        className="min-w-[116px]"
        loadColor="white"
        loading={loading}
        onClick={onClickDownloadPDF}
        type="button"
        variant={"outline-black"}
        size={"sm"}
      >
        출력 PDF 다운로드
      </Button>
    </div>
  );
};
export default ArtworkTableSummary;
