import { useState, useEffect, Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { MemberRes } from "@/app/api/dto/member";
import { MEMBER_STATUS_ARRAY, MEMBER_TYPE_ARRAY } from "@/constants/member";
import DurationBox from "@/app/_components/duration-box";

interface MemberFilterAndSearchBoxProps {
  data: MemberRes[]; // 전체 데이터
  setFilteredData: (data: MemberRes[]) => void; // 필터링 된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>; // 검색어 상태 업데이트 함수 추가
  setMemberType: Dispatch<SetStateAction<string>>; // 회원 유형 상태 업데이트 함수 추가
  setMemberStatus: Dispatch<SetStateAction<string>>; // 회원 상태 상태 업데이트 함수 추가
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >; // 날짜 상태 업데이트 함수 추가
  keyword: string; // keyword props 추가
}

const MemberFilterAndSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
  setKeyword,
  setMemberType,
  setMemberStatus,
  setDuration, // props로 받아오는지 확인
  keyword,
}: MemberFilterAndSearchBoxProps) => {
  const [selectedMemberType, setSelectedMemberType] = useState<string>("all"); // 선택된 회원 유형
  const [selectedMemberStatus, setSelectedMemberStatus] =
    useState<string>("all"); // 선택된 회원 상태
  const [durationState, setDurationState] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined); // 선택된 기간

  const handleCheckMemberType = (val: string) => {
    setSelectedMemberType(val);
    setMemberType(val); // 회원 유형 상태 업데이트
  };

  const handleCheckMemberStatus = (val: string) => {
    setSelectedMemberStatus(val);
    setMemberStatus(val); // 회원 상태 상태 업데이트
  };

  const handleDurationChange = (start?: Date, end?: Date) => {
    setDurationState({ start, end });
    setDuration({ start, end }); // 날짜 상태 업데이트
  };

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword); // 검색어 상태 업데이트
    setCurrentPage(1); // 페이지 초기화
  };

  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화

    // duration이 undefined일 경우를 처리
    if (
      durationState &&
      typeof durationState !== "string" &&
      (durationState.start === undefined || durationState.end === undefined)
    ) {
      return;
    }

    let filtered = data;

    // 검색어 필터링
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.email.toLowerCase().includes(lowerKeyword) ||
          item.userNo.toLowerCase().includes(lowerKeyword),
      );
    }

    // 회원 유형 필터링
    if (selectedMemberType !== "all") {
      filtered = filtered.filter(
        (item) => item.userType === selectedMemberType,
      );
    }

    // 회원 상태 필터링
    if (selectedMemberStatus !== "all") {
      filtered = filtered.filter(
        (item) => item.userStatus === selectedMemberStatus,
      );
    }

    // 기간 필터링
    if (durationState && typeof durationState !== "string") {
      if (durationState.start && durationState.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.createdAt);
          if (!durationState || !durationState.start || !durationState.end)
            return;
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
  }, [keyword, selectedMemberType, selectedMemberStatus, durationState]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!durationState) {
      setLoading(true);
    } else setLoading(false);
  }, [durationState, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="회원 이메일, 닉네임 또는 작가 ID를 입력하세요"
        setKeyword={handleSearch} // 검색어 변경 시 handleSearch 호출
      />
      <CheckBox
        label="회원 유형"
        conditions={MEMBER_TYPE_ARRAY}
        handleChangeValue={handleCheckMemberType} // 회원 유형 선택 시 상태 업데이트
      />
      <CheckBox
        label="회원 상태"
        conditions={MEMBER_STATUS_ARRAY}
        handleChangeValue={handleCheckMemberStatus} // 회원 상태 선택 시 상태 업데이트
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default MemberFilterAndSearchBox;
