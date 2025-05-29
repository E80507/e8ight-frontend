import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SERVICE_NAME } from "@/constants/service";
import { usePostChangePassword } from "@/hooks/auth/use-post-change-password";
import Image from "next/image";

interface PasswordChangeModalProps {
  onClickClose: () => void;
}

const PasswordChangeModal = ({ onClickClose }: PasswordChangeModalProps) => {
  const onSuccess = () => {
    alert("비밀번호가 변경되었어요");
    onClickClose();
  };
  const { form, onSubmit } = usePostChangePassword(onSuccess);

  const passwordArray = [
    {
      label: "현재 비밀번호",
      placeholder: "현재 비밀번호를 입력해주세요",
      name: "password",
    },
    {
      label: "새 비밀번호",
      placeholder: "새로운 비밀번호를 입력해주세요",
      name: "newPassword",
    },
    {
      label: "새 비밀번호 확인",
      placeholder: "새로운 비밀번호를 한 번 더 입력해주세요",
      name: "newPasswordConfirm",
    },
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 px-5">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-8 rounded-xl bg-white p-4"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-1">
              <Image
                src={"/svg/logo-black.svg"}
                alt={SERVICE_NAME}
                width={42}
                height={8.49}
              />
              <p className="heading-3">비밀번호 변경하기</p>
            </div>
            <div className="flex flex-col gap-4">
              {passwordArray.map((pw) => (
                <div className="flex flex-col gap-2" key={pw.label}>
                  <p className="heading-5">{pw.label}</p>
                  <CustomInputField
                    type="password"
                    form={form}
                    name={
                      pw.name as
                        | "password"
                        | "newPassword"
                        | "newPasswordConfirm"
                    }
                    placeholder={pw.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant={"outline"} onClick={onClickClose}>
              다음에 하기
            </Button>
            <Button>비밀번호 변경하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default PasswordChangeModal;
