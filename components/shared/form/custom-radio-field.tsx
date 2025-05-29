import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomRadioFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  radioValue: {
    value: string;
    text: string;
  }[];
  defaultValue?: string;
  isEssential?: boolean; // 필수 여부
  direction: "vertical" | "horizontal";
}

const CustomRadioField = <T extends FieldValues>({
  form,
  name,
  radioValue,
  defaultValue,
  direction,
}: CustomRadioFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormControl>
            <>
              <RadioGroup
                defaultValue={defaultValue}
                onValueChange={field.onChange}
                className={
                  direction === "vertical"
                    ? "flex flex-col gap-4"
                    : "flex gap-8"
                }
              >
                {radioValue.map((value) => (
                  <Label className="flex items-center gap-2" key={value.value}>
                    <RadioGroupItem value={value.value} id={value.value} />
                    <span className="body-2">{value.text}</span>
                  </Label>
                ))}
              </RadioGroup>
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default CustomRadioField;
