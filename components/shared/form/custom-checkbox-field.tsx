import { ReactNode } from "react";
import {
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
import Check from "../check";

interface CustomCheckboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: "circle" | "square";
  label?: ReactNode;
  isEssential?: boolean;
}

const CustomCheckboxField = <T extends FieldValues>({
  form,
  name,
  type = "square",
  label,
  isEssential = false,
}: CustomCheckboxFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-2">
          <FormControl>
            <div className="relative">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="peer absolute opacity-0 w-[18px] h-[18px] cursor-pointer z-10"
              />
              <Check type={type} isChecked={field.value} />
            </div>
          </FormControl>
          {label && (
            <FormLabel className="body-3 cursor-pointer select-none !mt-0">
              {label}
              {isEssential && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCheckboxField; 