import { useState, useEffect, Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import { OrderRes } from "@/app/api/dto/order";
import { ARTWORK_TYPE_ARRAY } from "@/constants/order";

interface OrderFilterSearchBoxProps {
  data: OrderRes[]; // 전체 데이터
  setFilteredData: (data: OrderRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSelectedIds: Dispatch<SetStateAction<string[]>>; // 선택된 데이터 아이디 배열
}

const OrderFilterSearchBox = ({
  data,
  setFilteredData,
  setCurrentPage,
  setSelectedIds,
}: OrderFilterSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [selectedArtworkType, setSelectedArtworkType] = useState<string>("all"); // 작품 유형 (사진 | 스티커 | 카드)
  // 굿즈 유형 변경 핸들러
  const handleCheckArtworkType = (val: string) => {
    setSelectedArtworkType(val);
    setSelectedIds([]); // 선택된 체크박스 초기화
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
          item.email.toLowerCase().includes(lowerKeyword),
      );
    }

    // 작품 유형
    if (selectedArtworkType !== "all") {
      filtered = filtered.filter(
        (item) => item.printCategory === selectedArtworkType,
      );
    }
    // console.log("filter 끝난 데이터", filtered);

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, selectedArtworkType, data]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="배송번호 / 회원 이메일을 입력하세요"
        setKeyword={setKeyword}
      />
      <CheckBox
        label={"굿즈 유형"}
        conditions={ARTWORK_TYPE_ARRAY}
        handleChangeValue={handleCheckArtworkType}
      />
    </div>
  );
};

export default OrderFilterSearchBox;
