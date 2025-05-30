import { useGetAccountList } from "@/hooks/account/use-get-account-list";
import FilterAndTableContainer from "./filter-and-table-container";

const AccountContainer = () => {
  const { data } = useGetAccountList();

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer data={data} />
    </div>
  );
};
export default AccountContainer;
