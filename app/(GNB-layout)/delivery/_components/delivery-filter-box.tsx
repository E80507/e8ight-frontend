import CheckBox from "@/app/_components/check-box";
import DurationBox from "@/app/_components/duration-box";
import SearchBar from "@/app/_components/search-bar";
import { DeliveryRes, PrintStatus } from "@/app/api/dto/delivery";
import { DeliveryStatus } from "@/app/api/dto/member";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

const PRINT_STATUS_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: PrintStatus.PRINTED,
    label: "출력",
  },
  {
    value: PrintStatus.NOT_PRINTED,
    label: "미출력",
  },
  {
    value: PrintStatus.CONFIRM_REQUIRED,
    label: "확인 필요",
  },
];

const DELIVERY_STATUS_ARRAY = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: DeliveryStatus.WAITING,
    label: "출고 대기",
  },
  {
    value: DeliveryStatus.COMPLETED,
    label: "출고 완료",
  },
  {
    value: DeliveryStatus.CANCELLED,
    label: "배송 취소",
  },
  {
    value: DeliveryStatus.CONFIRMED,
    label: "배송 완료",
  },
];

interface DeliveryFilterBoxProps {
  data: DeliveryRes[]; // 전체 데이터
  setFilteredData: (data: DeliveryRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  setDeliveryStatus: Dispatch<SetStateAction<string>>;
  setPrintStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
  setKeyword: Dispatch<SetStateAction<string>>;
  keyword: string;
}

const DeliveryFilterBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
  setSelectedIds,
  setDeliveryStatus,
  setPrintStatus,
  setDuration,
  setKeyword,
  keyword,
}: DeliveryFilterBoxProps) => {
  const [selectedPrintStatus, setSelectedPrintStatus] = useState<string>("all"); // 출력 상태 (출력 | 미출력 | 확인필요)
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] =
    useState<string>("all"); // 출고 상태 (대기 | 완료)
  const [durationState, setDurationState] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined); // 선택된 기간

  const handleChangePrintStatus = (val: string) => {
    setSelectedPrintStatus(val);
    setPrintStatus(val);
  };
  const handleChangeDeliveryStatus = (val: string) => {
    setSelectedDeliveryStatus(val);
    setDeliveryStatus(val);
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
          item.deliveryNo.toLowerCase().includes(lowerKeyword) ||
          item.email.toLowerCase().includes(lowerKeyword) ||
          item.ordererPhone.toLowerCase().includes(lowerKeyword),
      );
    }

    // 출력 상태
    if (selectedPrintStatus !== "all") {
      filtered = filtered.filter(
        (item) => item.printStatus === selectedPrintStatus,
      );
    }

    // 출고 상태
    if (selectedDeliveryStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.deliveryStatus) === selectedDeliveryStatus,
      );
    }

    // 기간
    if (durationState && typeof durationState !== "string") {
      if (durationState.start && durationState.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.deliveryRequestedAt);
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
    setSelectedIds([]); // 필터링 조건이 변경될 경우 선택된 배열 초기화
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedPrintStatus, selectedDeliveryStatus, durationState]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!durationState) {
      setLoading(true);
    } else setLoading(false);
  }, [durationState, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="배송번호 / 이메일 / 주문자 전화번호 중에서 입력하세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label="출력 상태"
        conditions={PRINT_STATUS_ARRAY}
        handleChangeValue={handleChangePrintStatus}
      />
      <CheckBox
        label="출고 상태"
        conditions={DELIVERY_STATUS_ARRAY}
        handleChangeValue={handleChangeDeliveryStatus}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};
export default DeliveryFilterBox;
