import { MemberStatus } from "@/app/api/dto/member";

// 회원 상태 한글 텍스트 변환 함수
export const handleStatusKRText = (
  status: MemberStatus,
  shouldText?: boolean,
) => {
  let statusKR = shouldText ? "정상" : "-";
  switch (status) {
    case MemberStatus.BLOCKED:
      statusKR = "차단";
      break;
    case MemberStatus.DELETED:
      statusKR = "탈퇴";
      break;
  }
  return statusKR;
};
