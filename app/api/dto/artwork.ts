// 작품 유형
export enum ArtworkCategory {
  // 기존 값 유지 (엽서 102x152mm)
  PHOTO = "PHOTO", // 엽서 사진(102x152mm, 4x6) : 1000P / 1장 - 유광 (반광택)
  CARD = "CARD", // 엽서 카드 : 800P / 1장 - 무광 (프리미엄 매트)
  STICKER = "STICKER", // 엽서 스티커 : 1200P / 1장 - 유광 (고광택 + 점착)
  // 새로운 엽서 타입 (102x152mm)
  POSTCARD_SEMI_GLOSS_PEARL = "POSTCARD_SEMI_GLOSS_PEARL", // 엽서 (102x152mm) - 유광 (반광택 + 펄)
  // 미니포스터 타입 (152x203mm)
  MINI_POSTER_SEMI_GLOSS = "MINI_POSTER_SEMI_GLOSS", // 미니포스터 (152x203mm) - 유광 (반광택)
  MINI_POSTER_SEMI_GLOSS_PEARL = "MINI_POSTER_SEMI_GLOSS_PEARL", // 미니포스터 (152x203mm) - 유광 (반광택 + 펄)
  // 포스터 타입 (210x297mm)
  POSTER_SEMI_GLOSS = "POSTER_SEMI_GLOSS", // 포스터 (210x297mm) - 유광 (반광택)
  POSTER_HIGH_GLOSS = "POSTER_HIGH_GLOSS", // 포스터 (210x297mm) - 유광 (고광택)
}

// 작품 방향
export enum ArtworkDirection {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
}

// 작품 상태
export enum ArtworkStatus {
  ACTIVE = "ACTIVE", // 진행
  EXPIRED = "EXPIRED", // 만료
  DELETED = "DELETED", // 삭제
  ALL = "all", // 전체
}

// 작품 목록 페이지네이션 요청
export interface ArtworkPaginationReq {
  page: number;
  limit: number;
  keyword?: string;
  artworkStatus?: ArtworkStatus;
  isBlocked?: boolean;
  startDate?: string;
  endDate?: string;
}

// 작품 목록 페이지네이션 응답
export interface ArtworkPaginationRes {
  items: ArtworkRes[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
// 작품 목록
export interface ArtworkRes {
  id: string; // 작품 아이디
  artistId: string; // 작가 ID
  artworkImage: string; // 작품 이미지
  artworkNo: string; // 작품 No
  nickname: string; // 닉네임
  email: string; // 작가 이메일
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  expiresAt: string; // 만료일
  likeCount: number; // 좋아요 수
  totalSaleCount: number; // 누적 출력 횟수
  totalSaleRevenue: number; // 누적 출력 포인트
  reportCount: number; // 누적 신고 횟수
  status: ArtworkStatus; // 작품 상태
  isBlocked: boolean; // 작품 비공개 여부
  imageDirection: ArtworkDirection; // 작품 방향
}

// 작품 상세 정보
export interface ArtworkDetailRes extends ArtworkRes {
  totalSaleCountDetail: {
    ["PHOTO"]: {
      saledCount: number; // 판매 수량
    };
    ["CARD"]: {
      saledCount: number; // 판매 수량
    };
    ["STICKER"]: {
      saledCount: number; // 판매 수량
    };
    ["POSTCARD_SEMI_GLOSS_PEARL"]: {
      saledCount: number; // 판매 수량
    };
    ["MINI_POSTER_SEMI_GLOSS"]: {
      saledCount: number; // 판매 수량
    };
    ["MINI_POSTER_SEMI_GLOSS_PEARL"]: {
      saledCount: number; // 판매 수량
    };
    // ["MINI_POSTER_HIGH_GLOSS"]: {
    //   saledCount: number; // 판매 수량
    // };
    ["POSTER_SEMI_GLOSS"]: {
      saledCount: number; // 판매 수량
    };
    // ["POSTER_SEMI_GLOSS_PEARL"]: {
    //   saledCount: number; // 판매 수량
    // };
    ["POSTER_HIGH_GLOSS"]: {
      saledCount: number; // 판매 수량
    };
  }; // 카테고리별 판매 정보
  description: string; // 작품 설명
  tags: string[]; // 작품 태그
  relatedLink: string | null; // 관령 링크
  statusUpdatedAt: string | null; // 작품 처리 상태 업데이트 일자
  pdfLink: string; // 출력 pdf 링크
  deletedAt: string; // 삭제 일자
}
