import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  selectValue: {
    value: string;
    text: string;
  }[];
  label: string;
  defaultValue?: string;
  disabled?: boolean;
  isEssential?: boolean; // 필수 입력 여부
}

const CustomSelectField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  selectValue,
  label,
  defaultValue,
  disabled,
  isEssential
}: CustomSelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormControl>
            <>
              <FormLabel htmlFor={name}>
                {label}
                {isEssential && (
                  <span className="ml-[2px] text-error">{`*`}</span>
                )}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled}
                defaultValue={defaultValue}
              >
                <SelectTrigger
                  className={field.value ? "" : " [&>span]:text-black/40"}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectValue.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default CustomSelectField;
