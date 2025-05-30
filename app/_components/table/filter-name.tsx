interface FilterNameProps {
  name: string;
  size?: "sm" | "md"; // default md
}

const FilterName = ({ name, size }: FilterNameProps) => {
  return (
    <p
      className={`flex w-[154px] shrink-0 items-center border-r bg-[#EEEFF1] px-5 ${size === "sm" ? "h-10 subtitle-3" : "min-h-[52px] pretendard-title-s"}`}
    >
      {name}
    </p>
  );
};
export default FilterName;
