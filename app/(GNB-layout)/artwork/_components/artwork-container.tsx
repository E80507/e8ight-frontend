import { ArtworkStatus } from "@/app/api/dto/artwork";
import { useGetArtworkList } from "@/hooks/artwork/use-get-artwork-list";
import FilterAndTableContainer from "./filter-and-table-container";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArtworkPaginationRes } from "@/app/api/dto/artwork";
const ArtworkContainer = () => {
  const prev = useSearchParams().get("prev");
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [keyword, setKeyword] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [isBlocked, setIsBlocked] = useState<string>("all");
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);
  const [filteredData, setFilteredData] = useState<ArtworkPaginationRes | null>(
    null,
  );
  const { data } = useGetArtworkList({
    page: currentPage,
    limit: 5,
    keyword,
    artworkStatus: artworkStatus as ArtworkStatus,
    isBlocked:
      isBlocked === "all" ? undefined : isBlocked === "false" ? false : true,
    startDate: duration?.start
      ? duration.start.toISOString().split("T")[0]
      : undefined,
    endDate: duration?.end
      ? duration.end.toISOString().split("T")[0]
      : undefined,
  });
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  if (!filteredData) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer
        data={filteredData}
        keyword={keyword}
        setKeyword={setKeyword}
        setArtworkStatus={setArtworkStatus}
        setIsBlocked={setIsBlocked}
        setDuration={setDuration}
      />
    </div>
  );
};

export default ArtworkContainer;
