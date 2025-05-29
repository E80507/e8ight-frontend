// 게시글 작성 시간 변환 함수
export const handlePostTime = (time: string | number) => {
  const currentTime = new Date();
  const postTime = new Date(time);
  const diff = currentTime.getTime() - postTime.getTime();
  const diffMinute = Math.floor(diff / 60000);
  const diffHour = Math.floor(diff / 3600000);

  // 1분 ~ 59분
  if (diffMinute < 60) {
    return `${diffMinute}분 전`;
  }
  // 1시간 ~ 23시간 59분
  else if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }
  // 24시간 이상
  else {
    const month = (postTime.getMonth() + 1).toString().padStart(2, "0");
    const date = postTime.getDate().toString().padStart(2, "0");
    return `${postTime.getFullYear() - 2000}.${month}.${date}`;
  }
};

// 게시글 남은 시간 계산 함수
export const handleRemainingTime = (expiresAt: string | Date) => {
  const currentTime = new Date();
  const expirationTime = new Date(expiresAt);
  const diff = expirationTime.getTime() - currentTime.getTime();
  const diffMinute = Math.floor(diff / 60000);
  const diffHour = Math.floor(diff / 3600000);

  if (diffHour > 0) {
    return `${diffHour}시간`;
  } else {
    return `${diffMinute}분`;
  }
};

// 게시글 임박 여부
export const handleIsEndSoon = (expiresAt: string | Date) => {
  const currentTime = new Date();
  const expirationTime = new Date(expiresAt);
  const diff = expirationTime.getTime() - currentTime.getTime();
  const diffHour = Math.floor(diff / 3600000);

  if (diffHour > 0) {
    return false;
  } else {
    return true;
  }
};

// 만료 여부
export const handleIsExpired = (expiresAt: string | Date) => {
  const currentTime = new Date();
  const expirationTime = new Date(expiresAt);
  return currentTime.getTime() > expirationTime.getTime();
};
