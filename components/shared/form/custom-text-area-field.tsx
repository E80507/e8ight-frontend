import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { X } from "lucide-react";

interface CustomTextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  label?: string;
  isEssential?: boolean; // 필수 입력 여부
  textAreaClass?: string;
  maxLength?: number;
}

const CustomTextareaField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  isEssential,
  textAreaClass,
  maxLength = 300,
}: CustomTextareaFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const error = form.formState.errors[name];

  // 텍스트 변경 핸들러
  const onChangeTextarea = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    if (value.length <= maxLength) {
      field.onChange(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // 현재 텍스트 길이 계산
        const currentLength = (field.value || "").toString().length;

        return (
          <FormItem className="relative flex flex-col gap-3">
            {label && (
              <FormLabel htmlFor={name} className="gap-0">
                {label}
                {isEssential && (
                  <span className="ml-[4px] text-error">{`*`}</span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  className={`min-h-[160px] disabled:mt-3 disabled:bg-black/10 outline outline-1 outline-transparent ${
                    error
                      ? "border-error outline-error focus-visible:border-error focus-visible:ring-1 focus-visible:ring-error"
                      : ""
                  } ${textAreaClass}`}
                  onChange={(e) => onChangeTextarea(e.target.value, field)}
                  value={field.value}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button
                  type="button"
                  className={`absolute right-[16px] top-[16px] text-[#5E616E] hover:text-[#474953] transition-opacity ${isFocused ? "opacity-100" : "opacity-0"}`}
                  onClick={() => {
                    field.onChange("");
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-[16px] right-[16px] caption text-[#5E616E]">
                  {`${currentLength}/${maxLength}`}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
export default CustomTextareaField;
