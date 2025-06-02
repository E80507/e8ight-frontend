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
    <div className="flex flex-col gap-y-8 p-10 max-w-[1200px] mx-auto">
      <div className="items-center justify-between hidden web:flex">
        <h1 className="web:pretendard-title-l pretendard-title-m">
          컨텐츠 추가
        </h1>
        <Button size="lg" className="w-[97px]">
          게시하기
        </Button>
      </div>
      <form className="flex flex-col gap-[32px] mb-3">
        <FormProvider {...form}>
          <div className="w-[177px] pretandard-subtitle-m">
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
