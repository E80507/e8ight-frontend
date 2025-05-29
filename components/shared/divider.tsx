interface DividerProps {
  weight: "thin" | "bold";
}

const Divider = ({ weight }: DividerProps) => {
  const height = weight === "bold" ? "12" : "1";

  return (
    <div
      className={`-ml-5 w-screen max-w-[600px] ${weight === "bold" ? "web:hidden" : ""}`}
    >
      <hr
        className="w-full border-none bg-[#F6F6F6]"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
export default Divider;
