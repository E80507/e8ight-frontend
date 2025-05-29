import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

export type DepthMenu = {
  label: string;
  icon: string;
  path: {
    label: string;
    path: string;
  }[];
};

interface MenuAccordionProps {
  currentPath: string; // 현재 경로
  menu: DepthMenu; // 메뉴 탭
}

const MenuAccordion = ({ menu, currentPath }: MenuAccordionProps) => {
  return (
    <Accordion key={menu.label} type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Image
            className="-mt-px"
            src={`/svg/${menu.icon}.svg`}
            alt={menu.label}
            width={24}
            height={24}
            sizes="size-6"
          />
          {menu.label}
        </AccordionTrigger>
        <AccordionContent>
          {menu.path.map((tab) => (
            <Link
              prefetch={false}
              href={tab.path}
              key={tab.label}
              className={`block rounded-md px-6 py-4 heading-5 hover:underline ${currentPath === tab.path ? "bg-[#353434]" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default MenuAccordion;
