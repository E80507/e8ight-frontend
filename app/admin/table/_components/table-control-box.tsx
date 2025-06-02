import { Button } from "@/components/ui/button";

interface TableControlBoxProps {
  totalCount: number;
  selectedCount: number;
  onDelete: () => void;
}

export function TableControlBox({
  totalCount,
  selectedCount,
  onDelete,
}: TableControlBoxProps) {
  return (
    <div className="flex justify-between items-center mb-[16px] mt-[40px]">
      <div className="text-gray-600">
        총 <span className="font-semibold text-black">{totalCount}</span>건
      </div>

      <div className="flex gap-2">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={onDelete}
          disabled={selectedCount === 0}
          className={`w-[97px] ${
            selectedCount > 0
              ? ""
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          삭제하기
        </Button>

        <Button size={"lg"} className="w-[97px]" onClick={() => {}}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
