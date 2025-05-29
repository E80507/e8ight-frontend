export enum PointChargeStatus {
  SUCCESS = "SUCCESS", // 충전 완료
  CONFIRMED = "CONFIRMED", // 충전 확정
  CANCELLED = "CANCELLED", // 충전 취소
  FAILED = "FAILED", // 충전 실패
  ALL = "all", // 전체
}

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
export enum TransactionPurpose {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  REFUND = "REFUND",
  CANCEL = "CANCEL",
  RECHARGE = "RECHARGE",
  SIGNUP_RECHARGE = "SIGNUP_RECHARGE",
  CANCEL_RECHARGE = "CANCEL_RECHARGE",
  DELIVERY = "DELIVERY",
}

export interface PointChargeRes {
  id: string; // 아이디
  transactionNo: string; // 충전 번호
  email: string; // 이메일
  balance: number; // 충전 후 보유 포인트
  amount: number; // 포인트 충전량
  paidAmount: number; // 실제 지불 금액
  status: PointChargeStatus; // 충전 상태
  isRefundable: boolean; // 환불 가능 여부
  isRefunded: boolean; // 환불 여부
  transactionType: TransactionType; // 충전 유형 (참고 : 관리자 지급이 사라졌기 때문에 현재는 일반 충전만 옴)
  transactionDate: string; // 충전 일시
  paymentNo: string; // 결제 번호
  receiptUrl: string; // 영수증 URL
  purpose: TransactionPurpose; // 충전 목적
}

export interface PointChargePaginationRes {
  items: PointChargeRes[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface PointChargePaginationReq {
  page: number;
  limit: number;
  keyword?: string;
  rechargeStatus?: PointChargeStatus;
  startDate?: string;
  endDate?: string;
}

export enum PointUsageTransactionType {
  DELIVERY = "DELIVERY", // 배송비
  PURCHASE = "PURCHASE", // 작품 구매
  ALL = "all", // 전체
}

export interface PointUsageRes {
  id: string;
  transactionNo: string;
  email: string;
  balance: number; // 사용 후 보유 포인트
  amount: number; // 포인트 사용량
  artworkNo: string; // 작품 번호
  quantity: number; // 작품 구매 수량
  transactionType: PointUsageTransactionType; // 포인트 사용 유형 [배송비 | 작품 구매]
  status: PointChargeStatus; // 포인트 사용 상태 (포인트 충전 상태와 동일)
  transactionDate: string;
}

export interface PointUsagePaginationRes {
  items: PointUsageRes[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface PointUsagePaginationReq {
  page: number;
  limit: number;
  keyword?: string;
  purpose?: PointUsageTransactionType;
  usageStatus?: PointChargeStatus;
  startDate?: string;
  endDate?: string;
}

export interface PointChargeSalesRes {
  totalSales: number;
  startDate: string;
  endDate: string;
  totalCount: number;
}
