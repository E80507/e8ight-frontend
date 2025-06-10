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
  "직접입력",
  "gmail.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
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
  const [isCustomDomain, setIsCustomDomain] = useState(true);
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
          {/* 라벨 */}
          {label && (
            <FormLabel className="mb-3 web:mb-2 gap-0" htmlFor={name}>
              {label}
              {isEssential && (
                <span className="ml-[4px] text-error">{`*`}</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            <div className="flex items-center gap-2">
              {/* 이메일 아이디 인풋 */}
              <Input
                type="text"
                disabled={disabled}
                id={name}
                className={`flex-1 h-[48px] outline outline-1 outline-transparent ${
                  error
                    ? "border-error outline-error focus-visible:border-error focus-visible:ring-1 focus-visible:ring-error"
                    : ""
                } ${className}`}
                onChange={(e) => handleEmailChange(e.target.value, field)}
                placeholder={placeholder}
                value={emailId}
              />

              {/* 골뱅이 */}
              <span className="text-gray-500">@</span>

              {/* 도메인 선택 셀렉트 */}
              <Select
                onValueChange={(value) => handleDomainSelect(value, field)}
                value={isCustomDomain ? "직접입력" : domain}
              >
                <SelectTrigger
                  className={`flex-1 h-[48px] outline outline-1 outline-transparent`}
                >
                  {isCustomDomain ? (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Input
                        type="text"
                        className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="직접 입력"
                        onChange={(e) =>
                          handleCustomDomainChange(e.target.value, field)
                        }
                        value={customDomain}
                        onFocus={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  ) : (
                    <SelectValue />
                  )}
                </SelectTrigger>

                {/* 도메인 선택 컨텐츠 */}
                <SelectContent className="z-[1000]">
                  {EMAIL_DOMAINS.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>

          {/* 에러 메시지 */}
          <div className="mt-2">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
export default CustomEmailField;
