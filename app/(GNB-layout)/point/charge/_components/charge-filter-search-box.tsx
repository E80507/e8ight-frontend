import CheckBox from "@/app/_components/check-box";
import DurationBox from "@/app/_components/duration-box";
import SearchBar from "@/app/_components/search-bar";
import { PointChargeRes, PointChargeStatus } from "@/app/api/dto/point";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CHARGE_STATUS_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: PointChargeStatus.SUCCESS,
    label: "충전 완료",
  },
  {
    value: PointChargeStatus.CONFIRMED,
    label: "충전 확정",
  },
  {
    value: PointChargeStatus.CANCELLED,
    label: "충전 취소",
  },
  // {
  //   value: PointChargeStatus.FAILED,
  //   label: "충전 실패",
  // },
];

interface ChargeFilterSearchBoxProps {
  data: PointChargeRes[]; // 전체 데이터
  setFilteredData: (data: PointChargeRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setRechargeStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const ChargeFilterSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
  keyword,
  setKeyword,
  setRechargeStatus,
  setDuration,
}: ChargeFilterSearchBoxProps) => {
  const [selectedChargeStatus, setSelectedChargeStatus] =
    useState<string>("all"); // 충전 상태 (완료 | 확정 | 취소 | 실패)
  const [durationState, setDurationState] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined); // 선택된 기간

  const handleCheckChargeStatus = (val: string) => {
    setSelectedChargeStatus(val);
    setRechargeStatus(val); // 충전 상태 상태 업데이트
  };

  const handleDurationChange = (start?: Date, end?: Date) => {
    setDurationState({ start, end });
    setDuration({ start, end }); // 날짜 상태 업데이트
  };

  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화
    let filtered = data;

    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.transactionNo?.toLowerCase().includes(lowerKeyword) ||
          item.email.toLowerCase().includes(lowerKeyword),
      );
    }

    // 충전 상태
    if (selectedChargeStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.status) === selectedChargeStatus,
      );
    }

    // 기간
    if (durationState && typeof durationState !== "string") {
      if (durationState.start && durationState.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.transactionDate);
          if (!durationState || !durationState.start || !durationState.end)
            return false;
          return (
            createdAt >= durationState.start && createdAt <= durationState.end
          );
        });
      }
    }

    setFilteredData(filtered);
  };

  // 필터/검색 조건에 따라 필터링 함수 트리거
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedChargeStatus, durationState]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!durationState) {
      setLoading(true);
    } else setLoading(false);
  }, [durationState, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="충전번호 또는 회원 이메일을 입력하세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label="충전 상태"
        conditions={CHARGE_STATUS_ARRAY}
        handleChangeValue={handleCheckChargeStatus}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default ChargeFilterSearchBox;
