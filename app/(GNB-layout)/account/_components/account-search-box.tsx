import SearchBar from "@/app/_components/search-bar";
import { AccountRes } from "@/app/api/dto/account";
import { useEffect, useState } from "react";

interface AccountSearchBoxProps {
  data: AccountRes[]; // 전체 데이터
  setFilteredData: (data: AccountRes[]) => void; // 필터링된 데이터를 업데이트하는 함수
}

const AccountSearchBox = ({ data, setFilteredData }: AccountSearchBoxProps) => {
  // return (
  const [keyword, setKeyword] = useState(""); // 검색어

  const filterData = () => {
    let filtered = data;
    // 검색어
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerKeyword) ||
          item.loginId.toLowerCase().includes(lowerKeyword),
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div className="w-full">
      <SearchBar
        placeholder="이름 또는 아이디를 입력해주세요"
        setKeyword={setKeyword}
      />
    </div>
  );
};
export default AccountSearchBox;
