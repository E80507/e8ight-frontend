import { useState, useEffect, Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { ArtworkRes, ArtworkStatus } from "@/app/api/dto/artwork";
import {
  ARTWORK_EXPOSE_STATUS_ARRAY,
  ARTWORK_STATUS_ARRAY,
} from "@/constants/artwork";
import DurationBox from "@/app/_components/duration-box";

interface ArtworkFilterSearchBoxProps {
  data: ArtworkRes[]; // 전체 데이터
  setFilteredData: (data: ArtworkRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>;
  setArtworkStatus: Dispatch<SetStateAction<string>>;
  setIsBlocked: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
  keyword: string;
}

const ArtworkFilterSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
  setKeyword,
  setArtworkStatus,
  setIsBlocked,
  setDuration,
  keyword,
}: ArtworkFilterSearchBoxProps) => {
  const [selectedArtworkStatus, setSelectedArtworkStatus] =
    useState<string>("all"); // 선택된 작품 상태
  const [selectedBlockStatus, setSelectedBlockStatus] = useState<string>("all"); // 선택된 작품 처리 상태
  const [durationState, setDurationState] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined); // 선택된 기간

  const handleCheckArtworkStatus = (val: string) => {
    setSelectedArtworkStatus(val);
    setArtworkStatus(val as ArtworkStatus);
  };
  const handleCheckArtworkBlockStatus = (val: string) => {
    console.log("선택된 처리 상태:", val);
    setSelectedBlockStatus(val);
    // '전체'를 선택할 경우 isBlocked를 제외
    if (val === "all") {
      setIsBlocked("all"); // 쿼리에서 제외
    } else {
      setIsBlocked(val === "false" ? "false" : "true");
    }
  };
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDurationState({ start, end });
    setDuration({ start, end });
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

    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.artworkNo.toLowerCase().includes(lowerKeyword) ||
          item.artistId.toLowerCase().includes(lowerKeyword),
      );
    }

    // 작품 상태 (진행 | 만료 | 삭제)
    if (selectedArtworkStatus !== "all") {
      filtered = filtered.filter(
        (item) => item.status === selectedArtworkStatus,
      );
    }

    // 작품 처리 상태 (공개 | 비공개)
    if (selectedBlockStatus !== "all") {
      filtered = filtered.filter(
        (item) => String(item.isBlocked) === selectedBlockStatus,
      );
    }

    // 기간 필터링
    if (durationState && typeof durationState !== "string") {
      if (durationState.start && durationState.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.createdAt);
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
  }, [keyword, selectedArtworkStatus, selectedBlockStatus, durationState]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!durationState) {
      setLoading(true);
    } else setLoading(false);
  }, [durationState, setLoading]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="작품번호 또는 작가 ID, 닉네임, 이메일을 입력하세요"
        setKeyword={handleSearch}
      />
      <CheckBox
        label="작품 상태"
        conditions={ARTWORK_STATUS_ARRAY}
        handleChangeValue={handleCheckArtworkStatus}
      />
      <CheckBox
        label="처리 상태"
        conditions={ARTWORK_EXPOSE_STATUS_ARRAY}
        handleChangeValue={handleCheckArtworkBlockStatus}
      />
      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default ArtworkFilterSearchBox;
