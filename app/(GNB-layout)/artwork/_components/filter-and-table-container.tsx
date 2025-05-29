import { useEffect, useState, Dispatch, SetStateAction } from "react";
import ArtworkFilterSearchBox from "./artwork-filter-search-box";
import { ArtworkTable } from "./artwork-table";
import { ArtworkPaginationRes } from "@/app/api/dto/artwork";
import { useSearchParams } from "next/navigation";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: ArtworkPaginationRes;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setArtworkStatus: Dispatch<SetStateAction<string>>;
  setIsBlocked: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const FilterAndTableContainer = ({
  data,
  keyword,
  setKeyword,
  setArtworkStatus,
  setIsBlocked,
  setDuration,
}: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [filteredData, setFilteredData] = useState(data.items);
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [isLoading, setLoading] = useState(true); // 기간 필터링이 적용되었는지에 따라 변경되는 로딩 상태

  useEffect(() => {
    if (prev) {
      // console.log(prev);
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage, filteredData]);

  useEffect(() => {
    setFilteredData(data.items);
  }, [data]);

  return (
    <>
      <ArtworkFilterSearchBox
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        data={filteredData}
        setFilteredData={setFilteredData}
        setKeyword={setKeyword}
        setArtworkStatus={setArtworkStatus}
        setIsBlocked={setIsBlocked}
        setDuration={setDuration}
        keyword={keyword}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <ArtworkTable
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
