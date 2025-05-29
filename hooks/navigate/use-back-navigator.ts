import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useBackNavigator = (
  isChanged: boolean,
  handleModalOn: () => void,
  newPath: string,
  isConfirmed?: boolean, // 나가기 버튼 클릭 여부
) => {
  const router = useRouter();
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handleBeforeunload = (e: BeforeUnloadEvent) => {
      if (isChanged && !isConfirmed) {
        e.preventDefault();
      }
    };

    const handlePopState = () => {
      if (isChanged && !isConfirmed) {
        handleModalOn();
      } else {
        router.push(newPath);
      }
    };

    if (isConfirmed) {
      window.removeEventListener("beforeunload", handleBeforeunload);
      window.removeEventListener("popstate", handlePopState);
      router.push(newPath);
    }

    window.addEventListener("beforeunload", handleBeforeunload);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isChanged, handleModalOn, isConfirmed, newPath, router]);
};

export default useBackNavigator;
