export enum MemberStatus {
  ACTIVE = "ACTIVE", // 정상
  DELETED = "DELETED", // 탈퇴
  BLOCKED = "BLOCKED", // (일반 유저) 차단
  ALL = "all", // 전체
}

export enum UserType {
  USER = "USER",
  ARTIST = "ARTIST",
  ALL = "all", // 전체
}

export interface MemberRes {
  id: string; // 회원 id
  userNo: string; // 회원 No
  userType: UserType; // 회원 유형 [작가 | 일반 회원]
  createdAt: string; // 가입일
  nickname: string; // 닉네임
  email: string;
  totalOrderCount: number; // 누적 주문 횟수
  totalOrderAmount: number; // 누적 주문 포인트
  recentOrderAt: string; // 최근 주문일
  loginCount: number; // 로그인 횟수
  pointBalance: number; // 보유 포인트
  userStatus: MemberStatus;
  isBlocked: boolean; // 차단 여부
  blockedAt: null | string; // 차단 일시
  memo: string | null; // 메모
}

// 회원 목록 조회(페이지네이션)
export interface MemberPaginationReq {
  page: number;
  limit: number;
  keyword?: string;
  userType?: UserType;
  userStatus?: MemberStatus;
  startDate?: string;
  endDate?: string;
}

// 회원 목록 조회(페이지네이션) 응답
export interface MemberPaginationRes {
  items: MemberRes[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
// 일반 유저 상세 정보
export interface UserDetailRes extends MemberRes {
  statusUpdatedAt?: string; // 처리 상태 업데이트 일시
}

// 작가 상세 정보
export interface ArtistDetailRes {
  id: string; // id
  artistId: string; // 작가 ID
  createdAt: string; // 작가 등록일
  nickname: string; // 닉네임
  profileImage: string; // 프로필 이미지
  subscriberCount: number; // 구독자 수
  userStatus: MemberStatus; // 회원 상태 [정상 | 차단 | 탈퇴]
  thisYearRevenue: number; // 올해 매출
  totalRevenue: number; // 총 매출
  reportCount: number; // 누적 신고 횟수
}

// 출고 상태
export enum DeliveryStatus {
  WAITING = "WAITING", // 대기
  COMPLETED = "COMPLETED", // 출고 완료
  CONFIRMED = "CONFIRMED", // 수령 확정
  CANCELLED = "CANCELLED", // 취소
  ALL = "all", // 전체
}

// 일반 유저의 주문 정보
export interface UserOrderRes {
  id: string;
  createdAt: string; // 배송 신청일
  deliveryFee: number; // 배송 금액
  quantity: number; // 배송 수량
  amount: number; // 상품 총 액
  orderer: string; // 주문자
  recipient: string; // 수령자
  phone: string; // 수령자 전화번호
  deliveryStatus: DeliveryStatus; // 출고 상태 [출고 대기 | 출고 완료]
}

// 신고 처리 상태
export enum ReportStatus {
  WAITING = "WAITING", // 처리 중
  "LOCK-DOWN" = "LOCK-DOWN", // 비공개
  NORMAL = "NORMAL", // 해당 없음 (정상)
}

// 회원 정보 변경 (작가일 경우 메모만 변경 가능)
export interface PatchUserInfoReq {
  memo?: string; // 메모
  isBlocked?: boolean | string; // 차단 여부
}
