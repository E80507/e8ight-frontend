import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import Check from "../check";

interface CustomCheckboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: "circle" | "square";
  label?: ReactNode;
  isEssential?: boolean;
  value?: string;
  showMessage?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckboxField = <T extends FieldValues>({
  form,
  name,
  type = "square",
  label,
  isEssential = false,
  value,
  showMessage = true,
  // disabled = false,
  onChange,
}: CustomCheckboxFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // 그룹 체크박스인 경우 배열에서 값 확인
        const isChecked = Array.isArray(field.value)
          ? field.value?.includes(value)
          : field.value === true;

        // 체크박스 변경 핸들러
        const handleChange = (checked: boolean) => {
          if (value && Array.isArray(field.value)) {
            // 그룹 체크박스인 경우 배열 업데이트
            const currentValues = field.value || [];
            const newValue = checked
              ? [...currentValues, value]
              : currentValues.filter((v: string) => v !== value);
            field.onChange(newValue);
            onChange?.(checked);
          } else {
            // 단일 체크박스인 경우 boolean 값 업데이트
            field.onChange(checked);
            onChange?.(checked);
          }
        };

        // 고유 ID 생성
        const id = `checkbox-${name}-${value || "single"}`;

        return (
          <FormItem className="flex flex-row items-center space-x-2">
            <label
              htmlFor={id}
              className="flex flex-1 cursor-pointer items-center gap-2"
            >
              <FormControl>
                <div className="relative inline-block">
                  <input
                    id={id}
                    type="checkbox"
                    checked={isChecked || false}
                    onChange={(e) => handleChange(e.target.checked)}
                    className="peer absolute z-10 size-[20px] cursor-pointer rounded-[2px] opacity-0"
                    value={value}
                    name={`${name}-${value}`}
                  />
                  <Check type={type} isChecked={isChecked || false} />
                </div>
              </FormControl>
              {label && (
                <span className="select-none pretendard-body-2">
                  {label}
                  {isEssential && <span className="ml-1 text-red-500">*</span>}
                </span>
              )}
            </label>
            {showMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};

export default CustomCheckboxField;
