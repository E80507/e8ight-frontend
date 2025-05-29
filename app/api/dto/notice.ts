export enum NoticeStatus {
  ACTIVE = "ACTIVE", // 게시
  DELETED = "DELETED", // 삭제
}

export interface NoticeRes {
  id: string; // id
  artistId: string; // 작가 ID
  noticeNo: string; // 공지 No
  nickname: string; // 닉네임
  email: string; // 작가 이메일
  content: string; // 내용
  createdAt: string; // 생성일자
  updatedAt: string; // 수정일자
  deletedAt: string; // 삭제일자
  likeCount: number; // 좋아요 수
  status: NoticeStatus; // 공지 상태
  isBlocked: boolean; // 공지 비공개 여부
}

export interface NoticeDetailRes extends NoticeRes {
  artistId: string;
  nickname: string;
  reportCount: number;
  tags: string[] | null;
  blockedAt: null | string; // 공지 비공개
}
