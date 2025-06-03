export interface FormMessageProps {
  type: "error" | "success";
  message: string;
}

export default function FormMessage({ type, message }: FormMessageProps) {
  const textColorClass = type === "error" ? "text-red-500" : "text-green-500";

  return <p className={`pretendard-body-3 ${textColorClass}`}>{message}</p>;
}
