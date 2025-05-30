import formattedDate from "@/util/date";
import { ChevronLeft, ChevronRight, TruckIcon } from "lucide-react";

interface DayControllerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DayController = ({ date, setDate }: DayControllerProps) => {
  // 요일 계산
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const week = weekDays[date.getDay()]; // 요일 가져오기

  // 날짜 텍스트
  const dateText = `${formattedDate(date, "INPUT_DATE")} (${week}) 주문 출력`;

  // 이전 날로 이동
  const onClickPrev = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  // 다음 날로 이동
  const onClickNext = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  // 다음 날 버튼 비활성화 여부 (내일까지 이동 가능)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  const isNextDisabled = selectedDate >= tomorrow;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button onClick={onClickPrev}>
          <ChevronLeft size={24} />
        </button>
        
        <p className="heading-4">{dateText}</p>

        <button disabled={isNextDisabled} onClick={onClickNext}>
          <ChevronRight
            className={isNextDisabled ? "text-gray-300" : ""}
            size={24}
          />
        </button>
      </div>

      <div className="flex items-center gap-2 pl-1 subtitle-3">
        <TruckIcon />
        <p>{`전날 정오 12시부터 오늘 정오 12시 이전까지의 주문건입니다.`}</p>
      </div>
    </div>
  );
};

export default DayController;
