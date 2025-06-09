"use client";

import { useState } from "react";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  PostLibraryInsightFormSchema,
  PostDXFormSchema,
  PostDownloadsFormSchema,
} from "@/schema/post";
import { POST_CATEGORIES, POST_CATEGORY_VALUES } from "@/constants/admin";
import { Button, IconButton } from "@/components/ui/button";
import { AdminCategory, CreatePostReq } from "@/app/api/dto/admin";
import ThumbnailUploader from "./_components/thumbnail-uploader";
import TagKeyword from "./_components/tag-keyword";
import dynamic from "next/dynamic";
import { usePostS3PresignedUrl } from "@/hooks/s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { createPost } from "@/app/api/admin";
import { useMediaQuery } from "@/hooks/admin/use-media-query";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { FormMessage } from "@/components/ui/form";
import { ADMIN_PAGE } from "@/constants/path";
import { useRef } from "react";
import { formatBytes } from "@/util/file";
import Image from "next/image";
import { uploadS3FileMetadata } from "@/app/api/s3";

const QuillEditor = dynamic(() => import("@/components/quill-editor"), {
  ssr: false,
});

const CreatePostPage = () => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);
  const isMobile = useMediaQuery("(max-width: 599px)");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileDetails, setFileDetails] = useState<
    { name: string; size: number; url: string }[] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileIds, setFileIds] = useState<string[]>([]);

  const schema =
    selectedCategory === POST_CATEGORY_VALUES.DX
      ? PostDXFormSchema
      : selectedCategory === POST_CATEGORY_VALUES.LIBRARY ||
          selectedCategory === POST_CATEGORY_VALUES.INSIGHT
        ? PostLibraryInsightFormSchema
        : PostDownloadsFormSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      thumbnail: undefined,
      author: "",
      mainImage: "",
      tags: [],
      keywords: [],
      linkUrl: "",
      file: [],
    },
  });

  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const [fileUrl] = await onPostS3PresignedUrl([file]);
      return fileUrl;
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      return "";
    }
  };

  const { trigger, isMutating } = useSWRMutation(
    "createPost",
    async (key, { arg }: { arg: CreatePostReq }) => {
      return await createPost(arg);
    },
  );

  const handleCreatePost = form.handleSubmit(
    async (data) => {
      try {
        const payload: CreatePostReq = {
          ...data,
          fileId: fileIds,
          content: data.content ?? "",
        };

        await trigger(payload);
        router.push(ADMIN_PAGE);
      } catch (error) {
        console.error("게시글 등록 실패", error);
      }
    },
    (errors) => {
      console.log("유효성 오류:", errors);
    },
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const updatedFiles = Array.from(files);

    const validFiles = updatedFiles.filter((file) => file.size <= MAX_SIZE);
    const invalidFiles = updatedFiles.filter((file) => file.size > MAX_SIZE);

    if (invalidFiles.length > 0) {
      setErrorMessage("파일 크기는 최대 10MB까지 가능합니다.");
    }

    if (validFiles.length > 0) {
      try {
        const uploadedFileDetails = await Promise.all(
          validFiles.map(async (file) => {
            // 1. S3 업로드
            const fileUrl = await handleImageUpload(file);

            // 2. 메타데이터 등록
            const fileMetadata = {
              fileName: file.name,
              fileSize: file.size,
              mimetype: file.type,
              fileUrl: fileUrl,
            };
            const data = await uploadS3FileMetadata(fileMetadata);

            // 3. fileIds 상태 저장
            setFileIds((prevIds) => [...prevIds, data.savedFile.id]);

            return {
              name: file.name,
              size: file.size,
              url: fileUrl,
            };
          }),
        );

        // 4. 상태에 파일 정보 저장
        setFileDetails((prev) => [...(prev || []), ...uploadedFileDetails]);
      } catch (error) {
        console.error("파일 업로드 실패", error);
        setErrorMessage("파일 업로드 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div className="web:h-full tablet:my-[40px] web:px-[120px]">
      <div className="mx-auto flex size-full max-w-[1200px] flex-col bg-white px-4 py-6 web:gap-y-8 web:rounded-lg web:p-10">
        <div className="hidden items-center justify-between web:flex">
          <h1 className="pretendard-title-m web:pretendard-title-l">
            컨텐츠 추가
          </h1>
          <Button
            size="lg"
            className="w-[97px]"
            onClick={handleCreatePost}
            disabled={isMutating}
          >
            게시하기
          </Button>
        </div>
        <form className="flex flex-col">
          <FormProvider {...form}>
            <div className="flex flex-col gap-y-4 web:gap-y-8">
              {/* 카테고리 필드 (공통) */}
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
                  className={`flex flex-col gap-y-4 web:gap-y-8 ${
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
                      <div className="flex flex-col gap-y-4 web:flex-row web:gap-x-1 web:gap-y-4">
                        {/* 제목, 저자 필드(라이브러리, 인사이트) */}
                        <CustomInputField
                          form={form}
                          name="title"
                          placeholder="제목을 입력해주세요."
                          label="제목"
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
                      <div>
                        <div
                          className={`${form.formState.errors.content ? "rounded-md border-2 border-error" : ""}`}
                        >
                          <QuillEditor
                            value={form.watch("content")}
                            onChange={(content) => {
                              form.setValue("content", content, {
                                shouldValidate: true,
                              });
                            }}
                            onImageUpload={handleImageUpload}
                            height={isMobile ? "401px" : "468px"}
                          />
                        </div>
                        <FormMessage className="!mt-2">
                          {form.formState.errors.content?.message}
                        </FormMessage>
                      </div>
                    </>
                  )}

                  {/* 썸네일 필드(공통) */}
                  <ThumbnailUploader
                    name="thumbnail"
                    category={selectedCategory}
                  />

                  {/* 첨부하기(Downloads)  */}
                  {selectedCategory === POST_CATEGORY_VALUES.DOWNLOADS && (
                    <div>
                      <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                          <p className="pretendard-subtitle-m">
                            첨부파일{" "}
                            <span className="text-label-natural pretendard-body-3">
                              (최대 10MB 제한)
                            </span>
                          </p>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-[97px]"
                            onClick={(e) => {
                              e.preventDefault();
                              fileInputRef.current?.click();
                              setErrorMessage("");
                            }}
                          >
                            추가하기
                          </Button>
                        </div>
                        <div className="w-full overflow-hidden rounded-xl border border-line-normal">
                          <div className="flex w-full items-center justify-between bg-gray-100 px-4 py-3">
                            <p className="text-label-normal pretendard-body-3">
                              파일명
                            </p>
                            <div className="flex items-center gap-x-8">
                              <p className="text-label-normal pretendard-body-3">
                                용량
                              </p>
                              {!fileDetails || fileDetails.length === 0 ? (
                                <IconButton
                                  src={"/svg/icon/download.svg"}
                                  width={18}
                                  height={18}
                                  variant="normal"
                                  size="xs"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fileInputRef.current?.click();
                                  }}
                                />
                              ) : (
                                <IconButton
                                  src={"/svg/icon/close.svg"}
                                  width={18}
                                  height={18}
                                  variant="normal"
                                  size="xs"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFileDetails(null);
                                    form.setValue("file", []);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          {!fileDetails || fileDetails.length === 0 ? (
                            <div className="px-4 py-3">
                              <p className="text-label-assistive pretendard-body-2">
                                등록된 파일이 없습니다.
                              </p>
                            </div>
                          ) : (
                            <div>
                              {fileDetails?.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between px-4 py-3"
                                >
                                  <div className="flex w-[calc(100%-90px)] items-center">
                                    <div className="relative mr-2.5 size-6 overflow-hidden rounded-[2px]">
                                      <Image
                                        src={file.url}
                                        alt={file.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <p className="line-clamp-1 max-w-[calc(100%-100px)] overflow-hidden truncate text-label-normal pretendard-body-3">
                                      {file.name}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-x-6">
                                    <p className="whitespace-nowrap text-label-normal pretendard-body-3">
                                      {formatBytes(file.size)}
                                    </p>
                                    <IconButton
                                      src={"/svg/icon/close.svg"}
                                      width={18}
                                      height={18}
                                      variant="normal"
                                      size="xs"
                                      onClick={() => {
                                        setFileDetails(
                                          (prevDetails) =>
                                            prevDetails?.filter(
                                              (_, i) => i !== index,
                                            ) ?? [],
                                        );
                                        form.setValue(
                                          "file",
                                          form
                                            .watch("file")
                                            ?.filter((_, i) => i !== index) ??
                                            [],
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e)}
                        />
                      </div>
                      {errorMessage && (
                        <p className="mt-2 text-error pretendard-body-2">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedCategory !== POST_CATEGORY_VALUES.DX && (
                    <TagKeyword form={form} />
                  )}

                  {/* 링크 연결(DX) */}
                  {selectedCategory === POST_CATEGORY_VALUES.DX && (
                    <div className="flex flex-col web:mt-0 web:flex-row web:gap-y-0">
                      <div className="web:flex web:w-[453px] web:items-end">
                        <CustomInputField
                          form={form}
                          name="linkUrl"
                          label="링크 연결"
                          isEssential
                          noIcon
                          placeholder="링크를 해당 링크로 이동할 URL을 입력해주세요."
                          className="h-[57px] p-4 placeholder:text-gray-40 web:mb-0 web:rounded-r-none"
                        />
                        <Button
                          className={`h-[57px] web:w-[107px] web:rounded-l-none web:border-l-0 ${
                            form.formState.errors.linkUrl
                              ? "web:mb-[29.59px]"
                              : "web:mb-2"
                          }`}
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            if (form.watch("linkUrl")) {
                              window.open(form.watch("linkUrl"), "_blank");
                            }
                          }}
                        >
                          링크 확인
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button
                    size="cta"
                    className="mt-4 h-14 w-full web:hidden"
                    onClick={handleCreatePost}
                    disabled={isMutating}
                  >
                    게시하기
                  </Button>
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
