// 결제 취소 가능 여부 계산 함수
export const isCancelableOrder = (createdAt: string) => {
  // 결제일로부터 7일 이내인 경우만 취소 가능
  const currentTime = new Date();
  const orderTime = new Date(createdAt);
  const diff = currentTime.getTime() - orderTime.getTime();
  const diffDay = Math.floor(diff / 86400000);
  return diffDay < 7;
};
