import { useGetNoticeList } from "@/hooks/notice/use-get-notice-list";
import FilterAndTableContainer from "./filter-and-table-container";

const NoticeContainer = () => {
  const { data } = useGetNoticeList();

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer data={data} />
    </div>
  );
};

export default NoticeContainer;
