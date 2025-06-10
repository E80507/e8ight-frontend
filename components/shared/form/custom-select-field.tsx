import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  onChange?: (value: string) => void;
  className?: string;
}

const CustomSelectField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  selectValue,
  label,
  defaultValue,
  disabled,
  isEssential,
  onChange,
  className,
}: CustomSelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const error = form.formState.errors[name];

        return (
          <div className={className}>
            <FormItem>
              <FormControl>
                <>
                  <FormLabel htmlFor={name} className="mb-3 gap-0">
                    {label}
                    {isEssential && (
                      <span className="ml-[4px] text-error">{`*`}</span>
                    )}
                  </FormLabel>

                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onChange?.(value);
                    }}
                    value={field.value}
                    disabled={disabled}
                    defaultValue={defaultValue}
                  >
                    <SelectTrigger
                      className={`${
                        field.value ? "" : "[&>span]:text-black/40"
                      } outline outline-1 outline-transparent ${
                        error
                          ? "border-error outline-error focus-visible:border-error focus-visible:ring-1 focus-visible:ring-error"
                          : ""
                      }`}
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

              <div className="mt-2">
                <FormMessage />
              </div>
            </FormItem>
          </div>
        );
      }}
    />
  );
};
export default CustomSelectField;
