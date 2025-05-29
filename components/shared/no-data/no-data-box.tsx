import Image from "next/image";

interface NoDataBoxProps {
  text: string;
}

const NoDataBox = ({ text }: NoDataBoxProps) => {
  return (
    <div className="flex min-h-[414px] flex-col items-center justify-center gap-2 web:min-h-[454px] web:gap-4">
      <p className="text-black/20 heading-4">{text}</p>
      <Image
        className="h-[89px] w-[108px]"
        src={"/png/character/char-gray.png"}
        alt="책을 읽는 프린티 마스코트"
        width={89}
        height={108}
      />
    </div>
  );
};
export default NoDataBox;
