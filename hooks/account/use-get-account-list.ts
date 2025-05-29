import { getAccountList } from "@/app/api/account";
import { AccountRes } from "@/app/api/dto/account";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 관리자 계정 목록 조회
export const useGetAccountList = () => {
  const [result, setRes] = useState<{
    get: () => AccountRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getAccountList());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
