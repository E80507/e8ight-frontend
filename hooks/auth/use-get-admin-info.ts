import { Admin } from "@/app/api/dto/auth";
import { useEffect, useState } from "react";

const useGetAdminInfo = () => {
  const [admin, setAdmin] = useState<Admin | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const admin = localStorage.getItem("admin");
      if (admin) {
        const adminObj: Admin = JSON.parse(admin);
        setAdmin(adminObj);
      } else setAdmin(null);
    }
  }, []);

  return admin;
};

export default useGetAdminInfo;
