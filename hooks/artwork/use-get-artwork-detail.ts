import { getArtworkDetail } from "@/app/api/artwork";
import { ArtworkDetailRes } from "@/app/api/dto/artwork";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작품 상세 조회
export const useGetArtworkDetail = (id: string) => {
  const [result, setRes] = useState<{
    get: () => ArtworkDetailRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getArtworkDetail(id));
    setRes(newRes);
  }, [id]);

  const data = result ? result.get() : null;

  return { data };
};
