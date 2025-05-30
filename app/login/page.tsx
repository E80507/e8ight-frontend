"use client";
import { SERVICE_NAME } from "@/constants/service";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-[26px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={"/svg/logo-black.svg"}
          alt={SERVICE_NAME}
          width={168}
          height={34}
        />
        <p className="heading-4">Admin</p>
      </div>
    </div>
  );
};
export default LoginPage;
