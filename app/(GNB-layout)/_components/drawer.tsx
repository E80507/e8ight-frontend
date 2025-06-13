import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import Link from "next/link";
import ActionButtons from "@/components/shared/layout/action-buttons";
import ExternalLinksNav from "@/components/shared/layout/external-links-nav";

const GNBDrawer = ({
  open,
  onOpenChange,
  isHome,
  setIsMobileMenuOpen,
  NAV_LINKS,
  isSubscriptionModalOpen,
  setIsSubscriptionModalOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isHome: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  NAV_LINKS: { label: string; path: string }[];
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTitle className="sr-only">메뉴 열기</DrawerTitle>
      <DrawerContent
        className={`flex h-full flex-col items-center bg-white ${isHome ? "pt-[67px]" : "pt-12"} font-pretendard`}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-y-[59px]">
          {NAV_LINKS.map(({ label, path: href }) => (
            <Link
              key={href}
              prefetch={false}
              href={href}
              className="text-black transition-colors duration-300 ease-in-out h1-m hover:text-label-alternative active:text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <DrawerFooter className="flex flex-col justify-center gap-y-[26px] py-10">
          <ActionButtons
            className="border-black-1 bg-white text-black hover:bg-[#F7F8FA] active:bg-[#D6D7DC]"
            onClick={() => setIsMobileMenuOpen(false)}
            isSubscriptionModalOpen={isSubscriptionModalOpen}
            setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
          />
          <ExternalLinksNav />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GNBDrawer;
