import Image from "next/image";

const Check = ({ type }: { type: "circle" | "square" }) => {
  const rounded = type === "circle" ? "rounded-full" : "rounded-[2px]";
  const className = `${rounded}`;

  return (
    <div
      className={`${className} flex size-[18px] items-center justify-center border bg-white`}
    >
      <Image
        src={`/svg/icon/check.svg`}
        alt="체크 아이콘"
        width={12}
        height={12}
      />
      <Image
        className="hidden"
        src={`/svg/icon/check-white.svg`}
        alt="체크 아이콘"
        width={12}
        height={12}
      />
    </div>
  );
};
export default Check;
