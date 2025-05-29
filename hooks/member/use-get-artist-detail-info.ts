import { ArtistDetailRes } from "@/app/api/dto/member";
import { getUserDetailInfo } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작가 상세 정보 조회
export const useGetArtistDetailInfo = (id: string) => {
  const [result, setRes] = useState<{
    get: () => ArtistDetailRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserDetailInfo(id, true));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
