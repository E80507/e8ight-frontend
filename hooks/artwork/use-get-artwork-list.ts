import { getArtworkListWithPagination } from "@/app/api/artwork";
import { ArtworkPaginationReq, ArtworkPaginationRes } from "@/app/api/dto/artwork";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";

// 작품 목록 조회(페이지네이션)
export const useGetArtworkList = (req: ArtworkPaginationReq) => {
  const [result, setRes] = useState<{
    get: () => ArtworkPaginationRes | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getArtworkListWithPagination(req));
    setRes(newRes);
  }, [req.page, req.keyword, req.artworkStatus, req.isBlocked, req.startDate, req.endDate]);

  const data = result ? result.get() : null;

  return { data };
};
