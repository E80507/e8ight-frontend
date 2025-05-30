import { ArtworkCategory, ArtworkStatus } from "@/app/api/dto/artwork";
import { DeliveryStatus } from "@/app/api/dto/member";
import { NoticeStatus } from "@/app/api/dto/notice";
import { ReportReason, ReportResolution } from "@/app/api/dto/report";
import {
  PointChargeStatus,
  PointUsageTransactionType,
} from "@/app/api/dto/point";
import { PrintStatus } from "@/app/api/dto/delivery";
import { AdminCategory } from "@/app/api/dto/admin";

// 닉네임 마스킹 처리 함수
export const handleMaskName = (name: string, isName?: boolean): string => {
  // 이름일 경우
  if (isName) {
    if (name.length === 1) return name;
    if (name.length === 2) {
      return name.slice(0, 1) + "*";
    } else {
      return name.slice(0, 1) + "*".repeat(name.length - 2) + name.slice(-1);
    }
  }

  if (name.length === 1) {
    return name;
  }
  if (name.length < 4) {
    return name.slice(0, 1) + "*".repeat(name.length - 1);
  } else {
    return name.slice(0, 3) + "*".repeat(name.length - 3);
  }
};

// 이메일 마스킹 처리 함수
export const handleMaskEmail = (email: string): string => {
  const id = email.split("@")[0];
  const domain = email.split("@")[1];
  let maskedId; // 마스킹 처리 된 id

  if (id.length < 4) {
    maskedId = id.slice(0, 1) + "*".repeat(id.length - 1);
  } else {
    maskedId = id.slice(0, 2) + "*".repeat(id.length - 2);
  }
  return `${maskedId}@${domain}`;
};

// 전화번호 마스킹 처리 함수
export const handleMaskPhone = (phone: string): string => {
  const maskedPhone =
    phone.slice(0, 3) + "-" + "*".repeat(4) + "-" + phone.slice(7);
  return maskedPhone;
};

// 포인트 사용 유형 한글 텍스트 반환 함수
export const handleUseTypeKRText = (type: PointUsageTransactionType) => {
  let useTypeKRText = "";

  switch (type) {
    case PointUsageTransactionType.PURCHASE:
      useTypeKRText = "작품 구매";
      break;
    case PointUsageTransactionType.DELIVERY:
      useTypeKRText = "배송비 결제";
      break;
    default:
      useTypeKRText = "정보 없음";
  }
  return useTypeKRText;
};

// 포인트 사용 상태 한글 텍스트 반환 함수
export const handleUseStatusKRText = (useStatus: PointChargeStatus) => {
  let useStatusKRText = "";

  switch (useStatus) {
    case PointChargeStatus.SUCCESS:
      useStatusKRText = "사용 완료";
      break;
    case PointChargeStatus.CANCELLED:
      useStatusKRText = "사용 취소";
      break;
    case PointChargeStatus.FAILED:
      useStatusKRText = "사용 실패";
      break;
    case PointChargeStatus.CONFIRMED:
      useStatusKRText = "사용 확정";
      break;
    default:
      useStatusKRText = "정보 없음";
  }
  return useStatusKRText;
};

// 충전 상태 한글 텍스트 반환 함수
export const handleChargeStatusKRText = (chargeStatus: PointChargeStatus) => {
  let chargeStatusKR = "";

  switch (chargeStatus) {
    case PointChargeStatus.SUCCESS:
      chargeStatusKR = "충전 완료";
      break;
    case PointChargeStatus.CONFIRMED:
      chargeStatusKR = "충전 확정";
      break;
    case PointChargeStatus.FAILED:
      chargeStatusKR = "충전 실패";
      break;
    case PointChargeStatus.CANCELLED:
      chargeStatusKR = "충전 취소";
      break;
    default:
      chargeStatusKR = "정보 없음";
  }
  return chargeStatusKR;
};

// 환불 상태 한글 텍스트 반환 함수
export const handleRefundableKRText = (chargeStatus: PointChargeStatus) => {
  let refundableKR = "";

  // 충전 완료 - 환불 대기
  // 충전 확정 - -
  // 충전 실패 - -
  // 충전 취소 - 환불 완료

  switch (chargeStatus) {
    case PointChargeStatus.SUCCESS:
      refundableKR = "환불 대기";
      break;
    case PointChargeStatus.CANCELLED:
      refundableKR = "환불 완료";
      break;
    default:
      refundableKR = "-";
  }
  return refundableKR;
};

// 출고 상태 한글 텍스트 반환 함수
export const handleDeliveryStatusKRText = (deliveryStatus: DeliveryStatus) => {
  let deliveryStatusKR = "";

  switch (deliveryStatus) {
    case DeliveryStatus.WAITING: {
      return "출고 대기";
    }
    case DeliveryStatus.COMPLETED: {
      return "출고 완료";
    }
    case DeliveryStatus.CONFIRMED: {
      return "배송 완료";
    }
    case DeliveryStatus.CANCELLED: {
      return "배송 취소";
    }
    // case DeliveryStatus.COMPLETED:
    //   deliveryStatusKR = "출고 완료";
    //   break;
    // case DeliveryStatus.WAITING:
    //   deliveryStatusKR = "출고 대기";
    //   break;
    // case DeliveryStatus.CANCELLED:
    //   deliveryStatusKR = "배송 취소";
    //   break;
    default:
      deliveryStatusKR = "출고 대기";
  }

  return deliveryStatusKR;
};

// 작품 상태 한글 텍스트 반환 함수
export const handleArtworkStatusKRText = (status: ArtworkStatus) => {
  switch (status) {
    case ArtworkStatus.ACTIVE:
      return `진행`;
    case ArtworkStatus.DELETED:
      return `삭제`;
    case ArtworkStatus.EXPIRED:
      return `만료`;
    default:
      return "-";
  }
};

// 작품 카테고리 한글 텍스트 반환 함수
export const handleArtworkCategoryKRText = (category: ArtworkCategory) => {
  switch (category) {
    case ArtworkCategory.PHOTO:
      return `엽서 (102x152mm) / 유광 (반광택)`;
    case ArtworkCategory.CARD:
      return `엽서 (102x152mm) / 무광 (프리미엄 매트)`;
    case ArtworkCategory.STICKER:
      return `엽서 (102x152mm) / 유광 (고광택 + 점착)`;
    case ArtworkCategory.POSTCARD_SEMI_GLOSS_PEARL:
      return "엽서 (102x152mm) / 유광 (반광택 + 펄)";
    case ArtworkCategory.MINI_POSTER_SEMI_GLOSS:
      return "미니포스터 (152x203mm) / 유광 (반광택)";
    case ArtworkCategory.MINI_POSTER_SEMI_GLOSS_PEARL:
      return "미니포스터 (152x203mm) / 유광 (반광택 + 펄)";
    // case ArtworkCategory.MINI_POSTER_HIGH_GLOSS:
    //   return "미니포스터 (152x203mm) / 유광 (고광택)";
    case ArtworkCategory.POSTER_SEMI_GLOSS:
      return "포스터 (210x297mm) / 유광 (반광택)";
    // case ArtworkCategory.POSTER_SEMI_GLOSS_PEARL:
    //   return "포스터 (210x297mm) / 유광 (반광택 + 펄)";
    case ArtworkCategory.POSTER_HIGH_GLOSS:
      return "포스터 (210x297mm) / 유광 (고광택)";
    default:
      return "-";
  }
};

// 작품 노출 상태(처리 상태) 한글 텍스트 반환 함수
export const handleArtworkExposureStatusKRText = (isBlocked: boolean) => {
  if (isBlocked) {
    return "비공개";
  } else return "공개";
};

// 공지 상태 한글 텍스트 반환 함수
export const handleNoticeStatusKRText = (status: NoticeStatus) => {
  switch (status) {
    case NoticeStatus.ACTIVE:
      return `게시`;
    case NoticeStatus.DELETED:
      return `삭제`;
    default:
      return "-";
  }
};

// 공지 노출 상태(처리 상태) 한글 텍스트 반환 함수
export const handleNoticeExposureStatusKRText = (status: NoticeStatus) => {
  if (status === NoticeStatus.ACTIVE) {
    return "게시";
  } else return "삭제";
};

// 신고 사유 한글 텍스트 반환 함수
export const handleReportReasonKRText = (reason: ReportReason) => {
  let reasonKR = "";
  switch (reason) {
    case ReportReason.S1:
      reasonKR = "연령(S1)";
      break;
    case ReportReason.S2:
      reasonKR = "범죄(S2)";
      break;
    case ReportReason.S3:
      reasonKR = "욕설(S3)";
      break;
    case ReportReason.S4:
      reasonKR = "홍보(S4)";
      break;
    case ReportReason.S5:
      reasonKR = "침해(S5)";
      break;
    case ReportReason.S6:
      reasonKR = "기타(S6)";
      break;
  }
  return reasonKR;
};

// 신고 처리 상태 한글 텍스트 반환 함수
export const handleReportStatusText = (status: ReportResolution) => {
  let statusKR = "-";
  switch (status) {
    case ReportResolution.DELETE:
      statusKR = "삭제";
      break;
    case ReportResolution.HIDE:
      statusKR = "비공개";
      break;
    case ReportResolution.NOT_APPLICABLE:
      statusKR = "해당 없음";
      break;
    case ReportResolution.OTHER:
      statusKR = "기타";
      break;
  }
  return statusKR;
};

// 포인트 충전/사용 상태 한글 텍스트 반환 함수
export const handlePointChargeStatusText = (
  status: PointChargeStatus,
  isUsage?: boolean,
) => {
  let statusKR = "";
  switch (status) {
    case PointChargeStatus.CONFIRMED:
      statusKR = isUsage ? "사용 확정" : "충전 확정";
      break;
    case PointChargeStatus.SUCCESS:
      statusKR = isUsage ? "사용 완료" : "충전 완료";
      break;
    case PointChargeStatus.CANCELLED:
      statusKR = isUsage ? "사용 취소" : "충전 취소";
      break;
    case PointChargeStatus.FAILED:
      statusKR = isUsage ? "사용 실패" : "충전 실패";
      break;
  }
  return statusKR;
};

// 포인트 사용 유형 한글 텍스트 반환 함수
export const handlePointUsageTypeText = (type: PointUsageTransactionType) => {
  let typeKR = "";
  switch (type) {
    case PointUsageTransactionType.DELIVERY:
      typeKR = "배송비 결제";
      break;
    case PointUsageTransactionType.PURCHASE:
      typeKR = "작품 구매";
      break;
  }
  return typeKR;
};

// 배송 목록 출력 상태 한글 텍스트 반환 함수
export const handlePrintStatusKRText = (status: PrintStatus) => {
  let printStatusKR = "";
  switch (status) {
    case PrintStatus.PRINTED:
      printStatusKR = "출력";
      break;
    case PrintStatus.NOT_PRINTED:
      printStatusKR = "미출력";
      break;
    case PrintStatus.CONFIRM_REQUIRED:
      printStatusKR = "확인 필요";
      break;
  }
  return printStatusKR;
};

// 관리자 카테고리 영어 텍스트 반환 함수
export const handleAdminCategoryText = (category: AdminCategory) => {
  switch (category) {
    case AdminCategory.LIBRARY:
      return `Tech Library`;
    case AdminCategory.INSIGHT:
      return `Tech Insight`;
    case AdminCategory.DX:
      return `DX Simulation`;
    case AdminCategory.DOWNLOADS:
      return `Downloads`;
    default:
      return "-";
  }
};
