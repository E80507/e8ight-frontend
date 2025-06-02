import { getTechBlogList } from "@/app/api/admin";
import { wrapPromise } from "@/util/wrap-promise";
import { useState, useEffect } from "react";
import { AdminRes } from "@/app/api/dto/admin";

interface WrappedPromise<T> {
  get: () => T;
}

export const useGetTechBlogList = (
  year: number,
  month: number,
  day: number,
) => {
  const [result, setResult] = useState<WrappedPromise<AdminRes[]> | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getTechBlogList());
    setResult(newRes);
  }, []);

  return {
    data: result?.get(),
  };
};
