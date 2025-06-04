"use client";

import { useEffect, useState } from "react";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostFormSchema } from "@/schema/post";
import { POST_CATEGORIES, POST_CATEGORY_VALUES } from "@/constants/admin";
import { Button } from "@/components/ui/button";
import { AdminCategory, CreatePostReq } from "@/app/api/dto/admin";
import ThumbnailUploader from "./_components/thumbnail-uploader";
import TagKeyword from "./_components/tag-keyword";
import dynamic from "next/dynamic";
import { usePostS3PresignedUrl } from "@/hooks/s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { createPost } from "@/app/api/admin";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

const CreatePostPage = () => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      thumbnail: undefined,
      author: "",
      mainImage: "",
      tags: [],
      keywords: [],
    },
  });
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);
  const { handleSubmit } = form;
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const [fileUrl] = await onPostS3PresignedUrl([file]);
      return fileUrl;
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      return "";
    }
  };

  const handleCreatePost = handleSubmit(
    (data) => {
      createPost(data as CreatePostReq);
    },
    (errors) => {
      console.log("유효성 오류:", errors);
    },
  );
  useEffect(() => {
    console.log(form.getValues());
  }, [form.getValues()]);
  // content 폼값 직접 watch
  const contentValue = form.watch("content");

  // QuillEditor에서 변경된 내용 폼에 설정할 때 debounce 적용 (300ms)
  const onContentChange = (content: string) => {
    // 불필요한 setValue 반복 방지: content가 실제로 변경됐을 때만 호출
    if (content !== form.getValues("content")) {
      form.setValue("content", content, { shouldValidate: true });
    }
  };
  return (
    <div className="web:h-full web:pt-10">
      <div className="mx-auto flex size-full max-w-[1200px] flex-col gap-y-8 bg-white px-4 py-6 web:rounded-lg web:p-10">
        <div className="hidden items-center justify-between web:flex">
          <h1 className="pretendard-title-m web:pretendard-title-l">
            컨텐츠 추가
          </h1>
          <Button size="lg" className="w-[97px]" onClick={handleCreatePost}>
            게시하기
          </Button>
        </div>
        <form className="flex flex-col">
          <FormProvider {...form}>
            <div className="flex flex-col gap-y-8">
              {/* 카테고리 필드 */}
              <CustomSelectField
                selectValue={POST_CATEGORIES.map((category) => ({
                  value: category.value,
                  text: category.label,
                }))}
                form={form}
                name="category"
                placeholder="선택"
                label="카테고리"
                onChange={(value) => {
                  if (value) {
                    setIsCategorySelected(true);
                    const foundCategory = POST_CATEGORIES.find(
                      (category) => category.value === value,
                    );
                    if (foundCategory) {
                      setSelectedCategory(foundCategory.value as AdminCategory);
                    }
                  }
                }}
                className="web:w-[177px]"
              />

              {isCategorySelected && (
                <div
                  className={`flex flex-col gap-y-8 ${
                    selectedCategory === POST_CATEGORY_VALUES.LIBRARY ||
                    selectedCategory === POST_CATEGORY_VALUES.INSIGHT
                      ? "gap-x-3"
                      : ""
                  }`}
                >
                  {/* 제목 필드(다운로드, DX) */}
                  {selectedCategory !== POST_CATEGORY_VALUES.LIBRARY &&
                    selectedCategory !== POST_CATEGORY_VALUES.INSIGHT && (
                      <CustomInputField
                        form={form}
                        name="title"
                        placeholder="제목을 입력해주세요."
                        label="제목"
                        noIcon
                      />
                    )}

                  {(selectedCategory === POST_CATEGORY_VALUES.LIBRARY ||
                    selectedCategory === POST_CATEGORY_VALUES.INSIGHT) && (
                    <>
                      <div className="flex flex-col web:flex-row web:gap-x-3">
                        {/* 제목, 저자 필드(라이브러리, 인사이트) */}
                        <CustomInputField
                          form={form}
                          name="title"
                          placeholder="제목을 입력해주세요."
                          label="제목"
                          className="mb-8 web:mb-0"
                          isEssential
                          noIcon
                        />
                        <div className="web:w-[226px]">
                          <CustomInputField
                            form={form}
                            name="author"
                            placeholder="저자"
                            label="저자"
                            isEssential
                            noIcon
                          />
                        </div>
                      </div>
                      <QuillEditor
                        value={contentValue}
                        onChange={onContentChange}
                        onImageUpload={handleImageUpload}
                        height="468px"
                      />
                    </>
                  )}

                  {/* 썸네일 필드(공통) */}
                  <ThumbnailUploader name="thumbnail" />
                  {selectedCategory !== AdminCategory.DOWNLOADS && (
                    <TagKeyword form={form} />
                  )}
                </div>
              )}
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
