import {
  UserType,
  MemberPaginationRes,
  MemberStatus,
} from "@/app/api/dto/member";
import { useGetMemberList } from "@/hooks/member/use-get-member-list";
import FilterAndTableContainer from "./filter-and-table-container";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const MemberContainer = () => {
  const prev = useSearchParams().get("prev");
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [keyword, setKeyword] = useState("");
  const [memberType, setMemberType] = useState("");
  const [memberStatus, setMemberStatus] = useState("");
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);
  const [filteredData, setFilteredData] = useState<MemberPaginationRes | null>(
    null,
  );

  const { data } = useGetMemberList({
    page: currentPage,
    limit: 10,
    keyword,
    userType: memberType as UserType,
    userStatus: memberStatus as MemberStatus,
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
        setMemberType={setMemberType}
        setMemberStatus={setMemberStatus}
        setDuration={setDuration}
      />
    </div>
  );
};
export default MemberContainer;
