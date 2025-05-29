export enum NoticeStatus {
  ACTIVE = "ACTIVE", // 게시
  DELETED = "DELETED", // 삭제
}

export enum ReportTarget {
  ARTIST = "ARTIST", // 작가
  POST = "POST", // 게시글
}

export enum ReportReason {
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
  S5 = "S5",
  S6 = "S6",
}

export enum ReportResolution {
  DELETE = "DELETE", // 삭제
  HIDE = "HIDE", // 비공개
  NOT_APPLICABLE = "NOT_APPLICABLE", // 해당 없음
  OTHER = "OTHER", // 기타
}

export interface ReportRes {
  id: string;
  reportNo: string; // 신고 게시글 넘버
  createdAt: string; // 신고 일자
  artistId: string; // 작가 id
  target: ReportTarget; // 신고 대상
  userEmail: string; // 신고한 회원 이메일
  artistEmail: string; // 신고된 작가 이메일
  nickname: string; // 신고한 작가 닉네임
  targetNo?: string; // 작품 번호 (게시글 신고 대상일 경우만 존재)
  reportReason: ReportReason; // 신고 유형
  description: string; // 신고 이유
  isResolved: boolean; // 처리 완료 여부
  resolution: ReportResolution; // 처리 상태
  resolvedAt: string | null; // 신고 상태 업데이트 일자
}

// 신고 상태 변경
export interface PatchReportStatus {
  resolution: string;
}
