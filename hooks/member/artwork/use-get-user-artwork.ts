import { ArtworkRes } from "@/app/api/dto/artwork";
import { getUserArtworkList } from "@/app/api/member";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작가 회원 작품 목록 조회
export const useGetUserArtworkList = (id: string) => {
  const [result, setRes] = useState<{
    get: () => ArtworkRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getUserArtworkList(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
