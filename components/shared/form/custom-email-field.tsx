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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";

interface CustomEmailFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  isEssential?: boolean;
}

const EMAIL_DOMAINS = [
  "gmail.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "직접입력",
];

const CustomEmailField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  disabled,
  className,
  isEssential,
}: CustomEmailFieldProps<T>) => {
  const [emailId, setEmailId] = useState("");
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const error = form.formState.errors[name];

  const handleEmailChange = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    setEmailId(value);
    const fullEmail = value + "@" + (isCustomDomain ? customDomain : domain);
    field.onChange(fullEmail);
  };

  const handleDomainSelect = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    if (value === "직접입력") {
      setIsCustomDomain(true);
      setDomain("");
    } else {
      setIsCustomDomain(false);
      setDomain(value);
      const fullEmail = emailId + "@" + value;
      field.onChange(fullEmail);
    }
  };

  const handleCustomDomainChange = (
    value: string,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    setCustomDomain(value);
    const fullEmail = emailId + "@" + value;
    field.onChange(fullEmail);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="mb-3 web:mb-2" htmlFor={name}>
              {label}
              {isEssential && (
                <span className="ml-[2px] text-error">{`*`}</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                disabled={disabled}
                id={name}
                className={`flex-1 ${error ? "border-destructive focus-visible:border-destructive" : ""} ${className}`}
                onChange={(e) => handleEmailChange(e.target.value, field)}
                placeholder={placeholder}
                value={emailId}
              />
              <span className="text-gray-500">@</span>
              {isCustomDomain ? (
                <Select
                  onValueChange={(value) => handleDomainSelect(value, field)}
                >
                  <SelectTrigger className="flex-1">
                    <Input
                      type="text"
                      className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="직접 입력"
                      onChange={(e) =>
                        handleCustomDomainChange(e.target.value, field)
                      }
                      value={customDomain}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_DOMAINS.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Select
                  onValueChange={(value) => handleDomainSelect(value, field)}
                  value={domain}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_DOMAINS.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
export default CustomEmailField;
