import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { handlePhoneNumberInput } from "@/util/number";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface CustomInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  maxLength?: number; // 최대 입력 가능 글자 수
  noSpace?: boolean; // 첫 글자 공백 입력 불가 여부
  label?: string; // 라벨
  disabled?: boolean; // 비활성화 여부
  type?: "number" | "email" | "text" | "password" | "tel";
  className?: string; // 클래스명
  isEssential?: boolean; // 필수 입력 여부
  noIcon?: boolean; // 아이콘 미표시 여부
}

const CustomInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  maxLength,
  noSpace,
  label,
  disabled,
  type,
  className,
  isEssential,
  noIcon = false,
}: CustomInputFieldProps<T>) => {
  const [currentType, setCurrentType] = useState(type);
  const [isExposedPassword, setExposed] = useState(false);
  const error = form.formState.errors[name];

  // 값 변경 핸들러
  const onChangeValue = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    if (type === "tel") {
      const phone = handlePhoneNumberInput(value);
      field.onChange(phone);
    } else if (noSpace && value.includes(" ")) {
      field.onChange(value.trim());
    } else {
      field.onChange(value);
    }
  };

  // 비밀번호 보기 핸들러
  const onClickCheckPassword = () => {
    if (currentType === "password") {
      setCurrentType("text");
    } else {
      setCurrentType("password");
    }
    setExposed(!isExposedPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? (
            <FormLabel className="mb-3 gap-0" htmlFor={name}>
              {label}
              {isEssential && !noIcon && (
                <span className="ml-[4px] text-error">{`*`}</span>
              )}
            </FormLabel>
          ) : (
            <FormLabel htmlFor={name} />
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={currentType}
                disabled={disabled}
                id={name}
                maxLength={maxLength}
                className={`disabled:mt-3 disabled:bg-black/10 outline outline-1 outline-transparent ${
                  error
                    ? "border-error outline-error focus-visible:border-error focus-visible:ring-1 focus-visible:ring-error"
                    : ""
                } ${className}`}
                {...field}
                onChange={
                  noSpace || type === "tel"
                    ? (e) => onChangeValue(e.target.value, field)
                    : field.onChange
                }
                placeholder={placeholder}
              />
              {type === "password" && (
                <button
                  onClick={onClickCheckPassword}
                  type="button"
                  className="absolute inset-y-0 right-0 z-10 my-auto mr-4"
                >
                  {!isExposedPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <div className="mt-2">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
export default CustomInputField;
