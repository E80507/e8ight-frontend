interface FilterNameProps {
  name: string;
  size?: "sm" | "md"; // default md
}

const FilterName = ({ name, size }: FilterNameProps) => {
  return (
    <p
      className={`flex w-[154px] shrink-0 items-center border-r bg-gray-100 px-5 ${size === "sm" ? "h-10 subtitle-3" : "min-h-[52px] subtitle-2"}`}
    >
      {name}
    </p>
  );
};
export default FilterName;
