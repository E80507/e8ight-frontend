import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import CustomCheckboxField from "./custom-checkbox-field";

interface CheckboxOption {
  label: ReactNode;
  value: string;
}

interface CustomCheckboxGroupFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  options: CheckboxOption[];
  label?: string;
  isEssential?: boolean;
  className?: string;
}

const CustomCheckboxGroupField = <T extends FieldValues>({
  form,
  name,
  options,
  label,
  isEssential = false,
  className
}: CustomCheckboxGroupFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // 초기값이 없을 경우 빈 배열로 설정
        if (!field.value) {
          field.onChange([]);
        }

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="mb-[24px]">
                {label}
                {isEssential && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
            <div className="flex flex-col gap-[24px]">
              {options.map((option) => (
                <CustomCheckboxField
                  key={option.value}
                  form={form}
                  name={name}
                  label={option.label}
                  value={option.value}
                  showMessage={false}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomCheckboxGroupField; 