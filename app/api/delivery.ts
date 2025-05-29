import { apiFetch } from "@/util/fetch";
import {
  DeliveryExcelReq,
  DeliveryRes,
  PatchDeliveryDetailReq,
  PostDeliveryArtworkPDFReq,
  PostDeliveryCancelReq,
  DeliveryPaginationReq,
  DeliveryPaginationRes,
  DeliveryStatus,
  PrintStatus,
} from "./dto/delivery";

// 전체 배송 목록 조회
export const getDeliveryList = async (): Promise<() => DeliveryRes[]> => {
  try {
    const res = await apiFetch("/admin/deliveries");
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 목록 조회에 실패했습니다.");
  }
};

// 배송 목록 페이징 조회
export const getDeliveryListWithPagination = async (
  req: DeliveryPaginationReq,
): Promise<() => DeliveryPaginationRes> => {
  const params: string[] = []; // 파라미터를 저장할 배열

  // 각 파라미터를 조건부로 추가
  if (req.page) params.push(`page=${req.page}`);
  if (req.limit) params.push(`limit=${req.limit}`);
  if (req.keyword) params.push(`keyword=${req.keyword}`);
  if (req.deliveryStatus && req.deliveryStatus !== DeliveryStatus.ALL)
    params.push(`deliveryStatus=${req.deliveryStatus}`);
  if (req.printStatus && req.printStatus !== PrintStatus.ALL)
    params.push(`printStatus=${req.printStatus}`);
  if (req.startDate) params.push(`startDate=${req.startDate}`);
  if (req.endDate) params.push(`endDate=${req.endDate}`);

  // 파라미터를 쿼리 문자열로 변환
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";

  try {
    const res = await apiFetch(`/admin/deliveries/pagination${queryString}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 목록 조회에 실패했습니다.");
  }
};

// 배송 목록 상세 조회
export const getDeliveryDetail = async (
  deliveryId: string,
): Promise<() => DeliveryRes[]> => {
  try {
    const res = await apiFetch(`/admin/deliveries/${deliveryId}`);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 목록 상세 조회에 실패했습니다.");
  }
};

// 배송 상세 정보 변경
export const patchDeliveryDetail = async (
  deliveryId: string,
  data: PatchDeliveryDetailReq,
) => {
  try {
    const res = await apiFetch(`/admin/deliveries/${deliveryId}/info`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 상세 정보 변경에 실패했습니다.");
  }
};

// 배송 엑셀 시트 다운로드 - URL 반환
export const postDownloadDeliveryExcel = async (data: DeliveryExcelReq) => {
  try {
    const res = await apiFetch(
      `/admin/deliveries/excel/download`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      },
      "blob",
    );

    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 엑셀 시트 다운로드 URL 요청에 실패했습니다.");
  }
};

// 배송 작품 PDF 다운로드 - URL 반환
export const postDeliveryArtworkPDF = async (
  data: PostDeliveryArtworkPDFReq,
): Promise<{ pdfUrl: string }> => {
  try {
    const res = await apiFetch(`/admin/deliveries/pdf`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 작품 PDF 다운로드에 실패했습니다.");
  }
};

// 배송 취소 요청
export const postDeliveryCancel = async (data: PostDeliveryCancelReq) => {
  try {
    const res = await apiFetch(`/admin/deliveries/cancel`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("배송 취소 요청에 실패했습니다.");
  }
};
