import { ArtworkCategory } from "./artwork";

// 프린트 상태
export enum PrintStatus {
  NOT_PRINTED = "NOT_PRINTED", // 미출력
  PRINTED = "PRINTED", // 출력
  CONFIRM_REQUIRED = "CONFIRM_REQUIRED", // 확인 필요
  ALL = "all", // 전체
}

// 배송 상태
export enum DeliveryStatus {
  WAITING = "WAITING", // 출고 대기
  COMPLETED = "COMPLETED", // 출고 완료
  CANCELLED = "CANCELLED", // 배송 취소
  CONFIRMED = "CONFIRMED", // 수령 확정
  ALL = "all", // 전체
}

// 배송 엑셀 시트 다운로드 요청
export interface DeliveryExcelReq {
  deliveryIds: string[];
}

// 배송 목록
export interface DeliveryRes {
  id: string;
  deliveryNo: string;
  deliveryRequestedAt: string;
  email: string;
  deliveryPrice: number;
  quantity: number;
  totalPrice: number;
  ordererName: string;
  ordererPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryStatus: DeliveryStatus;
  printStatus: PrintStatus;
  printedCount: number; // 출력 완료된 작품 수
  totalCount: number; // 총 작품 수
}

export interface DeliveryArtwork {
  id: string;
  createdAt: string;
  updatedAt: string;
  artworkNo: string;
  printCategory: ArtworkCategory;
  quantity: number;
  printStatus: PrintStatus;
}

// 배송 목록 상세
export interface DeliveryDetailRes extends DeliveryRes {
  artworks: DeliveryArtwork[];
  memo?: string; // 메모
  deliveryDate?: string; // 출고 완료 일자
  deliveryAddress: string; // 배송지 기본 정보
  deliveryAddressDetail: string; // 배송지 상세 정보
  trackingNumber: string | null; // 운송장 번호
  postalCode: string; // 우편번호
}

// 배송 정보 변경
export interface PatchDeliveryDetailReq {
  recipientName?: string;
  recipientPhone?: string;
  deliveryAddress?: string;
  deliveryAddressDetail?: string;
  memo?: string;
  postalCode?: string;
}

// 배송 상품 pdf url 요청
export interface PostDeliveryArtworkPDFReq {
  purchasedArtworkIds: string[];
}

// 배송 취소 요청
export interface PostDeliveryCancelReq {
  deliveryIds: string[];
}

// 배송 목록 페이징 조회
export interface DeliveryPaginationReq {
  page: number;
  limit: number;
  keyword?: string;
  deliveryStatus?: DeliveryStatus;
  printStatus?: PrintStatus;
  startDate?: string;
  endDate?: string;
}

export interface DeliveryPaginationRes {
  items: DeliveryRes[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
