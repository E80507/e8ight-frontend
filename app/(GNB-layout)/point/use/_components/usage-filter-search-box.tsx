import CheckBox from "@/app/_components/check-box";
import DurationBox from "@/app/_components/duration-box";
import SearchBar from "@/app/_components/search-bar";
import {
  PointChargeStatus,
  PointUsageRes,
  PointUsageTransactionType,
} from "@/app/api/dto/point";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const USAGE_TYPE_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: PointUsageTransactionType.PURCHASE,
    label: "작품 구매",
  },
  {
    value: PointUsageTransactionType.DELIVERY,
    label: "배송비 결제",
  },
];

const USAGE_STATUS_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: PointChargeStatus.SUCCESS,
    label: "사용 완료",
  },
  {
    value: PointChargeStatus.CONFIRMED,
    label: "사용 확정",
  },
  {
    value: PointChargeStatus.CANCELLED,
    label: "사용 취소",
  },
  {
    value: PointChargeStatus.FAILED,
    label: "사용 실패",
  },
];

interface ChargeFilterSearchBoxProps {
  data: PointUsageRes[]; // 전체 데이터
  setFilteredData: (data: PointUsageRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>; // 검색어 상태 업데이트 함수 추가
  setPurpose: Dispatch<SetStateAction<string>>; // 사용 유형 상태 업데이트 함수 추가
  setUsageStatus: Dispatch<SetStateAction<string>>; // 사용 상태 상태 업데이트 함수 추가
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >; // 날짜 상태 업데이트 함수 추가
  keyword: string; // keyword props 추가
}

const ChargeFilterSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
  setKeyword,
  setPurpose,
  setUsageStatus,
  setDuration,
  keyword,
}: ChargeFilterSearchBoxProps) => {
  const [selectedUsageType, setSelectedUsageType] = useState<string>("all"); // 사용 유형 (작품 구매 | 배송비 결제)
  const [selectedUsageStatus, setSelectedUsageStatus] = useState<string>("all"); // 사용 상태 (성공 | 확정 | 취소 | 실패)
  const [durationState, setDurationState] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined); // 선택된 기간

  const handleCheckUsageType = (val: string) => {
    setSelectedUsageType(val);
    setPurpose(val); // 사용 유형 상태 업데이트
  };
  const handleCheckUsageStatus = (val: string) => {
    setSelectedUsageStatus(val);
    setUsageStatus(val); // 사용 상태 상태 업데이트
  };
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDurationState({ start, end });
    setDuration({ start, end });
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

    // 사용 유형
    if (selectedUsageType !== "all") {
      filtered = filtered.filter(
        (item) => String(item.transactionType) === selectedUsageType,
      );
    }

    // 사용 상태
    if (selectedUsageStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.status) === selectedUsageStatus,
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
  }, [keyword, selectedUsageType, selectedUsageStatus, durationState]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!durationState) {
      setLoading(true);
    } else setLoading(false);
  }, [durationState, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="사용번호 또는 회원 이메일을 입력하세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label="사용 유형"
        conditions={USAGE_TYPE_ARRAY}
        handleChangeValue={handleCheckUsageType}
      />
      <CheckBox
        label="사용 상태"
        handleChangeValue={handleCheckUsageStatus}
        conditions={USAGE_STATUS_ARRAY}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default ChargeFilterSearchBox;
