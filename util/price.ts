// 3자리 단위로 콤마 붙이는 함수
export const handleCommaPrice = (
  price: number | string | undefined,
  hasText?: string,
) => {
  if (price === undefined) return "-";
  if (hasText) {
    return `${Number(price).toLocaleString()}${hasText}`;
  } else return Number(price).toLocaleString();
};

// 3자리 단위로 콤마를 붙이고 Point로 변환하는 함수
export const handleCommaPoint = (price: number | string) => {
  return `${Number(price).toLocaleString()}P`;
};
