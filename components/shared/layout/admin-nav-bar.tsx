import Image from "next/image";
import Link from "next/link";
import { SERVICE_NAME } from "@/constants/service";
import { Button, IconButton } from "@/components/ui/button";
import { ADMIN_PAGE } from "@/constants/path";

const AdminNavBar = () => {
  return (
    <header className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between p-4 font-pretendard web:px-[120px] web:py-6">
      {/* 왼쪽: 로고 */}
      <Link
        type="button"
        href={ADMIN_PAGE}
        className="flex items-center"
        prefetch
      >
        <Image
          src="/svg/logo.svg"
          alt={SERVICE_NAME}
          width={64}
          height={43}
          priority
        />
        <span className="font-gibson h2-r">E8 Admin</span>
      </Link>

      {/* 오른쪽: 버튼 + 햄버거 아이콘 */}
      <div className="flex items-center gap-4">
        <Link href={"/"} prefetch>
          <Button
            variant="outline"
            size="lg"
            shape="round"
            className="hidden web:flex"
          >
            Back to Main
          </Button>
        </Link>
        <IconButton
          src="/svg/icon/menu.svg"
          width={24}
          height={24}
          variant="normal"
          size="sm"
          className="flex web:hidden"
        />
      </div>
    </header>
  );
};

export default AdminNavBar;
