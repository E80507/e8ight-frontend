import { useEffect } from "react";
import { LoadIcon } from "./loading";

export const FirstLoading = ({
  setLoading,
}: {
  setLoading: (value: boolean) => void;
}) => {
  // 0.5초 후에 로딩 상태 변경
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [setLoading]);

  return (
    <div className="fixed inset-0 flex w-screen items-center justify-center overflow-x-hidden p-10 text-black/50">
      <LoadIcon />
    </div>
  );
};
