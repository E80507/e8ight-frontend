export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  
  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return false;
    
    const serverDomain = new URL(serverUrl).hostname;
    const urlObj = new URL(url);
    return urlObj.hostname === serverDomain;
  } catch {
    return false;
  }
}; 