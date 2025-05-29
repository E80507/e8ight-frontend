import { UserDetailRes } from "@/app/api/dto/member";
import { getUserDetailInfo } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 일반 유저 상세 정보 조회
export const useGetUserDetailInfo = (id: string) => {
  const [result, setRes] = useState<{
    get: () => UserDetailRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserDetailInfo(id, false));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
