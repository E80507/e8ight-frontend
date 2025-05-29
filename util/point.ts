// 결제 취소 가능한지 확인하는 함수
/**
 *
 * @param paymentDate 결제일
 * @param point 현재 잔여 포인트
 * @param chargePoint 충전 포인트
 * @returns boolean
 * @description 결제일로부터 7일 이내이고 현재 잔여 포인트가 충전 포인트 이상이면 true, 그렇지 않으면 false를 반환
 */
export const isCancelablePoint = (
  paymentDate: string,
  point: number,
  chargePoint: number,
): boolean => {
  const now = new Date();
  const diff = now.getTime() - new Date(paymentDate).getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);
  if (diffDays <= 7 && point >= chargePoint) {
    return true;
  }
  return false;
};
