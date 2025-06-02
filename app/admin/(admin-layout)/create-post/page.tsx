"use client";

import { Button } from "@/components/ui/button";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import { POST_CATEGORIES } from "@/constants/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostFormSchema } from "@/schema/post";
import { FormProvider } from "react-hook-form";

const CreatePostPage = () => {
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
  });

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-y-8 p-10">
      <div className="hidden items-center justify-between web:flex">
        <h1 className="pretendard-title-m web:pretendard-title-l">
          컨텐츠 추가
        </h1>
        <Button size="lg" className="w-[97px]">
          게시하기
        </Button>
      </div>
      <form className="mb-3 flex flex-col gap-[32px]">
        <FormProvider {...form}>
          <div className="w-[177px] pretendard-subtitle-m">
            <CustomSelectField
              selectValue={POST_CATEGORIES}
              form={form}
              name="category"
              placeholder="선택"
              label="카테고리"
            />
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

export default CreatePostPage;
