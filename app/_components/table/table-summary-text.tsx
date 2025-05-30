interface TableSummaryTextProps {
  currentDataLen: number; // 현재 페이지의 데이터 수
  totalDataLen: number; // 총 데이터 수
  desc?: string; // 설명
  showCurrentDataLen?: boolean; // 현재 페이지의 데이터 수 표시 여부
}
const TableSummaryText = ({
  currentDataLen,
  totalDataLen,
  desc,
  showCurrentDataLen = true,
}: TableSummaryTextProps) => {
  return (
    <div className="flex gap-[6px] pretendard-subtitle-l">
      {showCurrentDataLen && (
        <>
          <span>{currentDataLen.toLocaleString()}건 조회</span>
          <span>{`/`}</span>
        </>
      )}
      <span>총 {totalDataLen.toLocaleString()}건</span>
      {desc && <span>{desc}</span>}
    </div>
  );
};
export default TableSummaryText;
