export const shareUrl = async (url: string | undefined) => {
  if (!url) return;

  try {
    await navigator.clipboard.writeText(url);
    alert("URL을 복사하였습니다.");
  } catch (err) {
    alert("URL 복사에 실패했습니다.");
  }
};
