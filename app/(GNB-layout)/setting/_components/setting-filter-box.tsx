import CheckBox from "@/app/_components/check-box";
import DurationBox from "@/app/_components/duration-box";
import SearchBar from "@/app/_components/search-bar";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

const NOTICE_VISIBLE_STATUS_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: "true",
    label: "노출",
  },
  {
    value: "false",
    label: "비노출",
  },
];

interface SettingFilterBoxProps {
  data: ServiceNoticeRes[]; // 전체 데이터
  setFilteredData: (data: ServiceNoticeRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const SettingFilterBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
}: SettingFilterBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedBlockStatus, setSelectedBlockStatus] = useState<string>("all"); // 출고 상태 (대기 | 완료)
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | string
  >({}); // 선택된 기간

  const handleChangeBlockStatus = (val: string) => setSelectedBlockStatus(val);
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDuration({ start, end });
  };

  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화
    let filtered = data;

    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter((item) =>
        item.announcementNo.toLowerCase().includes(lowerKeyword),
      );
    }

    // 출고 상태
    if (selectedBlockStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.isVisible) === selectedBlockStatus,
      );
    }

    // 기간
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
  }, [keyword, selectedBlockStatus, duration]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!duration) {
      setLoading(true);
    } else setLoading(false);
  }, [duration, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="서비스 공지 번호를 입력해주세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label="노출 상태"
        conditions={NOTICE_VISIBLE_STATUS_ARRAY}
        handleChangeValue={handleChangeBlockStatus}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};
export default SettingFilterBox;
