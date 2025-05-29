import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipRow = ({ text }: { text: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`mx-auto w-full max-w-[230px] truncate`}>{text}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[300px] break-words">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipRow;
