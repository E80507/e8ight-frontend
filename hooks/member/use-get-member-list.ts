import { MemberPaginationReq, MemberPaginationRes } from "@/app/api/dto/member";
import { getMemberListWithPagination } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 회원 목록 조회(페이지네이션)
export const useGetMemberList = (req: MemberPaginationReq) => {
  const [result, setRes] = useState<{
    get: () => MemberPaginationRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getMemberListWithPagination(req));
    setRes(newRes);
  }, [
    req.page,
    req.keyword,
    req.userType,
    req.userStatus,
    req.startDate,
    req.endDate,
  ]);

  const data = result ? result.get() : null;

  return { data };
};
