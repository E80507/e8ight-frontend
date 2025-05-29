import { apiFetch } from "@/util/fetch";
import {
  ArtworkDetailRes,
  ArtworkRes,
  ArtworkPaginationReq,
  ArtworkPaginationRes,
  ArtworkStatus,
} from "./dto/artwork";

// 전체 작품 조회
export const getAllArtwork = async (): Promise<() => ArtworkRes[]> => {
  try {
    const res = await apiFetch("/admin/artworks");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("작품 정보 조회에 실패했습니다.");
  }
};

// 작품 목록 조회(페이지네이션)
export const getArtworkListWithPagination = async (
  req: ArtworkPaginationReq,
): Promise<() => ArtworkPaginationRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (req.page) params.push(`page=${req.page}`);
  if (req.limit) params.push(`limit=${req.limit}`);
  if (req.keyword) params.push(`keyword=${req.keyword}`);
  if (req.artworkStatus && req.artworkStatus !== ArtworkStatus.ALL) {
    params.push(`artworkStatus=${req.artworkStatus}`);
  }
  if (req.isBlocked !== undefined) params.push(`isBlocked=${req.isBlocked}`);
  if (req.startDate) params.push(`startDate=${req.startDate}`);
  if (req.endDate) params.push(`endDate=${req.endDate}`);

  // 파라미터를 쿼리 문자열로 변환
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";

  try {
    const res = await apiFetch(`/admin/artworks/pagination${queryString}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("작품 목록 조회에 실패했습니다.");
  }
};

// 작품 상세 조회
export const getArtworkDetail = async (
  artworkId: string,
): Promise<() => ArtworkDetailRes> => {
  try {
    const res = await apiFetch(`/admin/artworks/${artworkId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("작품 정보 조회에 실패했습니다.");
  }
};

// 작품 공개 여부 변경
export const patchArtworkStatus = async (artworkId: string) => {
  try {
    const res = await apiFetch(`/admin/artworks/${artworkId}/block`, {
      method: "PATCH",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 상세 정보 변경에 실패했습니다.");
  }
};

// 작품 PDF 다운로드 - URL 반환
export const postArtworkPDF = async (
  artworkId: string,
): Promise<{ pdfUrl: string }> => {
  try {
    const res = await apiFetch(`/admin/artworks/pdf/${artworkId}`, {
      method: "POST",
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("작품 PDF 다운로드에 실패했습니다.");
  }
};
