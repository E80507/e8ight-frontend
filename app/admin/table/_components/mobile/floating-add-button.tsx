import { Plus } from "lucide-react";

const FloatingAddButton = () => {
  return (
    <button
      type="button"
      className="fixed bottom-[27px] right-[27px] bg-primary text-white rounded-full size-[56px] flex items-center justify-center cursor-pointer shadow-[0px_4px_5px_0px_#9F9F9F40]"
    >
      <Plus />
    </button>
  );
};

export default FloatingAddButton;
