import { ProfitRes } from "@/app/api/dto/profit";
import { getUserProfitList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작가 회원 수익 목록 조회
export const useGetArtistProfitList = (id: string) => {
  const [result, setRes] = useState<{
    get: () => ProfitRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserProfitList(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
