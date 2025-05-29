import { MemberRes } from "@/app/api/dto/member";
import { getMemberList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 회원 조회
export const useGetAllMemberList = () => {
  const [result, setRes] = useState<{
    get: () => MemberRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getMemberList());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
