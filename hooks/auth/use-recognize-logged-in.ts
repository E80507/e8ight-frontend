import { useEffect, useState } from "react";

export const useRecognizeLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const isTokenExpired = (token: string) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  };

  useEffect(() => {
    const checkLoggedInStatus = () => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        setIsLoggedIn(false);
        return;
      }
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];
      if (
        (accessToken && !isTokenExpired(accessToken)) ||
        (refreshToken && !isTokenExpired(refreshToken))
      ) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  return isLoggedIn;
};
