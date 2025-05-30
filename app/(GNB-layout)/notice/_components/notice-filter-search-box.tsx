import { useState, useEffect, Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import {
  NOTICE_EXPOSURE_STATUS_ARRAY,
  NOTICE_STATUS_ARRAY,
} from "@/constants/notice";
import { NoticeRes } from "@/app/api/dto/notice";
import DurationBox from "@/app/_components/duration-box";

interface NoticeFilterSearchBoxProps {
  data: NoticeRes[]; // 전체 데이터
  setFilteredData: (data: NoticeRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const NoticeFilterSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
}: NoticeFilterSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedNoticeStatus, setSelectedNoticeStatus] =
    useState<string>("all"); // 공지 상태 (게시 | 삭제)
  const [selectedBlockStatus, setSelectedBlockStatus] = useState<string>("all"); // 공지 공개 여부 (공개 | 비공개)
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | string
  >({}); // 선택된 기간

  const handleCheckMemberType = (val: string) => setSelectedNoticeStatus(val);
  const handleCheckMemberStatus = (val: string) => setSelectedBlockStatus(val);
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDuration({ start, end });
  };

  // 필터링 함수
  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화
    let filtered = data;

    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.noticeNo.toLowerCase().includes(lowerKeyword) ||
          item.artistId.toLowerCase().includes(lowerKeyword) ||
          item.nickname?.toLowerCase().includes(lowerKeyword) ||
          item.email?.toLowerCase().includes(lowerKeyword),
      );
    }

    // 작품 상태 (진행 | 만료 | 삭제)
    if (selectedNoticeStatus !== "all") {
      filtered = filtered.filter(
        (item) => item.status === selectedNoticeStatus,
      );
    }

    // 작품 처리 상태 (공개 | 비공개)
    if (selectedBlockStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.isBlocked) === selectedBlockStatus,
      );
    }

    // 기간 필터링
    if (duration && typeof duration !== "string") {
      if (duration.start && duration.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.createdAt);
          if (!duration || !duration.start || !duration.end) return false;
          return createdAt >= duration.start && createdAt <= duration.end;
        });
      }
    }

    setFilteredData(filtered);
  };

  // 필터/검색 조건에 따라 필터링 함수 트리거
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedNoticeStatus, selectedBlockStatus, duration]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!duration) {
      setLoading(true);
    } else setLoading(false);
  }, [duration, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="공지번호 또는 작가 ID, 닉네임, 이메일을 입력하세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label={"공지 상태"}
        conditions={NOTICE_STATUS_ARRAY}
        handleChangeValue={handleCheckMemberType}
      />
      <CheckBox
        label={"처리 상태"}
        conditions={NOTICE_EXPOSURE_STATUS_ARRAY}
        handleChangeValue={handleCheckMemberStatus}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default NoticeFilterSearchBox;
