import { getAllArtwork } from "@/app/api/artwork";
import { ArtworkRes } from "@/app/api/dto/artwork";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 전체 작품 조회
export const useGetAllArtworkList = () => {
  const [result, setRes] = useState<{
    get: () => ArtworkRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getAllArtwork());
    setRes(newRes);
  }, []);

  const data = result ? result.get() : null;

  return { data };
};
