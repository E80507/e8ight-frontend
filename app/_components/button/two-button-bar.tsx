import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TwoButtonBarProps {
  firstBtnTxt: string;
  secondBtnTxt: string;
  loading?: boolean;
  onClickFirstBtn?: () => void;
  onClickSecondBtn: () => void;
  secondBtnVariant?:
    | "default"
    | "pink"
    | "destructive"
    | "outline"
    | "outline-black";
  size?: "md" | "sm" | "lg";
  disabled?: boolean;
}
const TwoButtonBar = ({
  firstBtnTxt,
  secondBtnTxt,
  onClickFirstBtn,
  onClickSecondBtn,
  secondBtnVariant,
  loading,
  size,
  disabled,
}: TwoButtonBarProps) => {
  const router = useRouter();

  // 첫 번째 버튼(목록으로 버튼) 핸들러
  const onClickBack = () => router.back();
  return (
    <div className="flex max-w-max items-center gap-2">
      <Button
        type="button"
        size={size ?? "default"}
        onClick={onClickFirstBtn ?? onClickBack}
        variant={"outline"}
      >
        {firstBtnTxt}
      </Button>
      <Button
        loading={loading}
        type="button"
        size={size ?? "default"}
        onClick={onClickSecondBtn}
        variant={secondBtnVariant ?? "pink"}
        disabled={disabled}
        className={disabled ? "bg-gray-300" : ""}
      >
        {secondBtnTxt}
      </Button>
    </div>
  );
};

export default TwoButtonBar;
