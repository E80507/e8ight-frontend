import { useGetServiceNoticeList } from "@/hooks/setting/use-get-service-notice-list";
import FilterAndTableContainer from "./filter-and-table-container";

const SettingContainer = () => {
  const { data } = useGetServiceNoticeList();

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer data={data} />
    </div>
  );
};
export default SettingContainer;
