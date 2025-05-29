import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PASSWORD_RESET_PAGE } from "@/constants/path";
import { usePostLoggedIn } from "@/hooks/auth/use-post-logged-in";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);

  // 로그인 성공 콜백 핸들러
  const onSuccess = (isPasswordChangeRequired: boolean) => {
    if (isPasswordChangeRequired) {
      return router.push(PASSWORD_RESET_PAGE);
    } else router.replace("/");
  };
  const { form, onSubmit } = usePostLoggedIn(onSuccess, setError);
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-[350px] flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <CustomInputField form={form} name="loginId" placeholder="ID" />
          <CustomInputField
            type="password"
            form={form}
            name="password"
            placeholder="Password"
          />
          {error && <p className="pl-[6px] text-error caption">{error}</p>}
        </div>
        <Button>Log in</Button>
      </form>
    </Form>
  );
};
export default LoginForm;
