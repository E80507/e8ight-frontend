import { MemberPaginationRes } from "@/app/api/dto/member";
import MemberFilterAndSearchBox from "./filter-and-search-box";
import { MemberTable } from "./member-table";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: MemberPaginationRes;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setMemberType: Dispatch<SetStateAction<string>>;
  setMemberStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const FilterAndTableContainer = ({
  data,
  keyword,
  setKeyword,
  setMemberType,
  setMemberStatus,
  setDuration,
}: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [filteredData, setFilteredData] = useState(data.items);
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  useEffect(() => {
    setFilteredData(data.items);
  }, [data]);

  return (
    <>
      <MemberFilterAndSearchBox
        data={filteredData}
        setFilteredData={setFilteredData}
        setLoading={setLoading}
        setCurrentPage={setCurrentPage}
        setKeyword={setKeyword}
        setMemberType={setMemberType}
        setMemberStatus={setMemberStatus}
        setDuration={setDuration}
        keyword={keyword}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <MemberTable
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data.totalPages}
          totalDataLength={data.total}
        />
      )}
    </>
  );
};
export default FilterAndTableContainer;
