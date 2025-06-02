import { FilterAndTableContainer } from "./filter-and-table-container";
import Loading from "@/components/shared/loading/loading";

export default function DailyControllerAndFilterBoxContainer() {
  return (
    <div className="flex flex-col gap-10">
      <Loading>
        <FilterAndTableContainer />
      </Loading>
    </div>
  );
}
