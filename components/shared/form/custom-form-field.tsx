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

interface CustomFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  type?: "nickname";
  isValidValue?: boolean; // 유효성 검사 여부
  validText?: string; // 유효성 검사 텍스트
  maxLength?: number; // 최대 입력 가능 글자 수
  noFormMessage?: boolean; // FormMessage 미사용 여부
}

const CustomFormField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  type,
  isValidValue,
  validText,
  maxLength,
  noFormMessage,
}: CustomFormFieldProps<T>) => {
  const onChangeValue = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    if (value.includes(" ")) {
      field.onChange(value.trim());
    } else {
      field.onChange(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name} />
          <FormControl>
            <>
              <Input
                id={name}
                maxLength={maxLength}
                {...field}
                className={`px-4 py-3`}
                onChange={
                  type === "nickname"
                    ? (e) => onChangeValue(e.target.value, field)
                    : field.onChange
                }
                placeholder={placeholder}
              />
              {isValidValue && validText && (
                <FormMessage className="mt-2 text-[#676767]">
                  {validText}
                </FormMessage>
              )}
            </>
          </FormControl>
          {!noFormMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
