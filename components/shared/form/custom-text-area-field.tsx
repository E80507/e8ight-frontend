import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

interface CustomTextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  label?: string;
  hasTextLength?: boolean;
  isEssential?: boolean; // 필수 입력 여부
  textAreaClass?: string;
}

const CustomTextareaField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  hasTextLength,
  isEssential,
  textAreaClass,
}: CustomTextareaFieldProps<T>) => {
  const [value, setValue] = useState("");
  // const error = form.formState.errors[name];

  // 텍스트 변경 핸들러
  const onChangeTextarea = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    setValue(value);
    field.onChange(value);
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative flex flex-col gap-3">
          <FormControl>
            <>
              {label && (
                <FormLabel htmlFor={name}>
                  {label}
                  {isEssential && (
                    <span className="ml-[2px] text-primary">{`*`}</span>
                  )}
                </FormLabel>
              )}
              <Textarea
                {...field}
                className={`${textAreaClass}`}
                onChange={(e) => onChangeTextarea(e.target.value, field)}
                value={value || field.value}
                placeholder={placeholder}
              />
            </>
          </FormControl>
          {hasTextLength && (
            <span className="-mt-1 text-right caption">{`${value.length}/300`}</span>
          )}
        </FormItem>
      )}
    />
  );
};
export default CustomTextareaField;
