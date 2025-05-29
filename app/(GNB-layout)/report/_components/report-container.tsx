import { useGetReportList } from "@/hooks/report/use-get-report-list";
import FilterAndTableContainer from "./filter-and-table-container";

const ReportContainer = () => {
  const { data } = useGetReportList();

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer data={data} />
    </div>
  );
};

export default ReportContainer;
