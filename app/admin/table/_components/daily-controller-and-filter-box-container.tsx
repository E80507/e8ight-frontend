import { useGetTechBlogList } from "@/hooks/admin/use-get-tech-blog-list";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import FilterAndTableContainer from "./filter-and-table-container";

const DailyControllerAndFilterBoxContainer = () => {
  const [date, setDate] = useState(new Date());
  const { data } = useGetTechBlogList(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  
  if (!data) return null;

  return (
    <div className="flex flex-col gap-10">
      <Loading>
        <FilterAndTableContainer data={data} />
      </Loading>
    </div>
  );
};

export default DailyControllerAndFilterBoxContainer;
