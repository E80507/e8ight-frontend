import { getTechBlogList } from "@/app/api/admin";
import { wrapPromise } from "@/util/wrap-promise";
import { useEffect, useState } from "react";
import { AdminRes } from "@/app/api/dto/admin";

export const useGetTechBlogList = (year: number, month: number, day: number) => {
  const [result, setRes] = useState<{
    get: () => AdminRes[] | null;
  } | null>(null);

  useEffect(() => {
    const newRes = wrapPromise(getTechBlogList(year, month, day));
    setRes(newRes);
  }, [year, month, day]);

  const data = result ? result.get() : null;

  return { data };
};
