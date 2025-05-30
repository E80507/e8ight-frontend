import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import CustomCheckboxField from "./custom-checkbox-field";
import CustomInputField from "./custom-input-field";
import CustomSelectField from "./custom-select-field";

interface CheckboxOption {
  label: ReactNode;
  value: string;
  additionalField?: {
    type: "input" | "select";
    placeholder?: string;
    selectOptions?: { value: string; text: string }[];
    fieldName: string; // 추가 필드의 form 필드 이름
  };
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
  className,
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
                <div key={option.value} className="flex flex-col gap-3">
                  <CustomCheckboxField
                    form={form}
                    name={name}
                    label={option.label}
                    value={option.value}
                    showMessage={false}
                  />
                  {/* 체크박스가 선택되었고 추가 필드가 있는 경우에만 표시 */}
                  {field.value?.includes(option.value) &&
                    option.additionalField && (
                      <div className="ml-8">
                        {option.additionalField.type === "input" && (
                          <CustomInputField
                            form={form}
                            name={option.additionalField.fieldName as Path<T>}
                            placeholder={
                              option.additionalField.placeholder || ""
                            }
                          />
                        )}
                        {option.additionalField.type === "select" && (
                          <CustomSelectField
                            form={form}
                            name={option.additionalField.fieldName as Path<T>}
                            placeholder={
                              option.additionalField.placeholder ||
                              "선택해주세요"
                            }
                            selectValue={
                              option.additionalField.selectOptions || []
                            }
                            label=""
                          />
                        )}
                      </div>
                    )}
                </div>
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
