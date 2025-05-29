export interface ServiceNoticeRes {
  id: string; // id
  announcementNo: string; // 공지 번호
  title: string; // 공지 제목
  file: string; // 공지 파일
  link?: string; // 링크
  content: string; // 공지 내용
  createdAt: string; // 생성 일자
  updatedAt: string; // 수정 일자
  isVisible: boolean; // 공지 노출 여부
  statusUpdatedAt: string; // 공지 노출 상태 업데이트 일자
}

export interface ServiceNoticePostReq {
  title: string;
  content: string;
  file?: string;
}

export interface ServiceNoticeStatusPostReq {
  isVisible: boolean;
  ids: string[];
}

export interface ServiceNoticePatchReq {
  title: string;
  content: string;
  link?: string;
  file?: string | File;
  isVisible: boolean | string;
}
