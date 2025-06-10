"use client";

import { useState, useEffect } from "react";
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
import ThumbnailUploader from "@/app/admin/create-post/_components/thumbnail-uploader";
import TagKeyword from "@/app/admin/create-post/_components/tag-keyword";
import dynamic from "next/dynamic";
import { usePostS3PresignedUrl } from "@/hooks/s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { updatePost } from "@/app/api/admin";
import { useMediaQuery } from "@/hooks/admin/use-media-query";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { FormMessage } from "@/components/ui/form";
import { ADMIN_PAGE } from "@/constants/path";
import { useRef } from "react";
import { formatBytes } from "@/util/file";
import Image from "next/image";
import { uploadS3FileMetadata } from "@/app/api/s3";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import Loading from "@/components/shared/loading/loading";

const QuillEditor = dynamic(() => import("@/components/quill-editor"), {
  ssr: false,
  loading: () => <Loading />,
});

interface EditPostClientProps {
  params: { id: string };
}

const EditPostClient = ({ params }: EditPostClientProps) => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);
  const isMobile = useMediaQuery("(max-width: 599px)");
  const router = useRouter();
  const { id: postId } = params;
  const { post } = usePostDetail(postId || "");

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

  // 초기 데이터 설정
  useEffect(() => {
    if (post) {
      const category = post.category as AdminCategory;
      setSelectedCategory(category);
      setIsCategorySelected(true);

      setTimeout(() => {
        const formData = {
          title: post.title,
          category: post.category,
          content: post.content || "",
          thumbnail: post.thumbnail,
          author: post.author || "",
          mainImage: post.mainImage,
          tags: post.tags || [],
          keywords: post.keywords || [],
          linkUrl: post.linkUrl || "",
          file: post.files?.map((file) => file.fileUrl) || [],
        };

        // 폼 초기화
        form.reset(formData);

        // 각 필드 개별적으로 설정
        Object.entries(formData).forEach(([key, value]) => {
          form.setValue(key as keyof typeof formData, value);
        });

        if (post.files) {
          setFileIds(post.files.map((file) => file.id));

          // 파일 상세 정보 설정
          const fileDetailsData = post.files.map((file) => ({
            name: file.fileName,
            size: file.fileSize,
            url: file.fileUrl,
          }));
          setFileDetails(fileDetailsData);
        }
      }, 0);
    }
  }, [post, form]);

  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);

  // 이미지 업로드
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const [fileUrl] = await onPostS3PresignedUrl([file]);
      return fileUrl;
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      return "";
    }
  };

  // 게시글 수정
  const { trigger: updateTrigger, isMutating: isUpdating } = useSWRMutation(
    "updatePost",
    async (key, { arg }: { arg: { id: string; data: CreatePostReq } }) => {
      return await updatePost(arg.id, arg.data);
    },
  );

  // 게시글 수정 제출
  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        console.log("[폼 제출 성공]");
        console.log("[폼 데이터 전체]", data);
        console.log("[file 필드 타입]", typeof data.file);
        console.log("[file 필드 값]", data.file);
        if (Array.isArray(data.file)) {
          console.log(
            "[file 필드 배열 각 항목 타입]",
            data.file.map((item) => typeof item),
          );
        }

        const payload: CreatePostReq = {
          ...data,
          fileIds: fileIds,
          content: data.content ?? "",
        };

        if (postId) {
          await updateTrigger({ id: postId, data: payload });
        }
        router.push(ADMIN_PAGE);
      } catch (error) {
        console.error("게시글 수정 실패", error);
      }
    },
    (errors) => {
      console.log("[폼 제출 실패] 유효성 검사 오류:");
      console.log("[현재 폼 데이터]", form.getValues());
      console.log("[file 필드 현재 값]", form.getValues("file"));
      console.log("[유효성 검사 오류]", errors);
    },
  );

  // 파일 변경
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

        // 5. form의 file 필드에 URL 설정
        const currentUrls = form.getValues("file") || [];
        const newUrls = [
          ...currentUrls,
          ...uploadedFileDetails.map((file) => file.url),
        ];
        console.log("[파일 업로드] 설정할 URL 배열:", newUrls);
        form.setValue("file", newUrls, { shouldValidate: true });
        console.log(
          "[파일 업로드] form.getValues('file'):",
          form.getValues("file"),
        );
      } catch (error) {
        console.error("파일 업로드 실패", error);
        setErrorMessage("파일 업로드 중 문제가 발생했습니다.");
      }
    }
  };

  // 파일 삭제
  const handleRemoveFile = (index: number) => {
    const newFileDetails = fileDetails?.filter((_, i) => i !== index) ?? [];
    const newFileIds = fileIds.filter((_, i) => i !== index);

    setFileDetails(newFileDetails);
    setFileIds(newFileIds);
    form.setValue(
      "file",
      newFileDetails.map((file) => file.url),
      { shouldValidate: true },
    );
  };

  // 전체 파일 삭제
  const handleRemoveAllFiles = () => {
    setFileDetails(null);
    setFileIds([]);
    form.setValue("file", [], { shouldValidate: true });
  };

  return (
    <div className="web:h-full web:px-[120px] web:py-[40px]">
      <div className="mx-auto flex size-full max-w-[1200px] flex-col bg-white px-4 py-6 web:gap-y-8 web:rounded-lg web:p-10">
        <div className="hidden items-center justify-between web:flex">
          {/* 제목 */}
          <h1 className="pretendard-title-m web:pretendard-title-l">
            컨텐츠 수정
          </h1>

          {/* 수정하기 버튼 */}
          <Button
            size="lg"
            className="w-[97px]"
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            수정하기
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

              {/* 카테고리 선택 시 표시되는 필드 */}
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

                  {/* 라이브러리, 인사이트 카테고리 선택 시 표시되는 필드 */}
                  {(selectedCategory === POST_CATEGORY_VALUES.LIBRARY ||
                    selectedCategory === POST_CATEGORY_VALUES.INSIGHT) && (
                    <>
                      <div className="flex flex-col gap-y-4 web:flex-row web:gap-x-1 web:gap-y-4">
                        {/* 제목 필드(라이브러리, 인사이트) */}
                        <CustomInputField
                          form={form}
                          name="title"
                          placeholder="제목을 입력해주세요."
                          label="제목"
                          isEssential
                          noIcon
                        />

                        {/* 저자 필드(라이브러리, 인사이트) */}
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

                      {/* 내용 필드(라이브러리, 인사이트) */}
                      <div>
                        <div
                          className={`${form.formState.errors.content ? "rounded-md border-2 border-error" : ""}`}
                        >
                          <QuillEditor
                            key={`editor-${postId}`}
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

                  {/* 첨부하기 (Downloads)  */}
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

                          {/* 추가하기 버튼 (Downloads) */}
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

                        {/* 첨부파일 목록 */}
                        <div className="w-full overflow-hidden rounded-xl border border-line-normal">
                          <div className="flex w-full items-center justify-between bg-gray-100 px-4 py-3">
                            {/* 파일명 */}
                            <p className="text-label-normal pretendard-body-3">
                              파일명
                            </p>

                            <div className="flex items-center gap-x-8">
                              {/* 용량 */}
                              <p className="text-label-normal pretendard-body-3">
                                용량
                              </p>

                              {/* 다운로드 버튼 */}
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
                                  type="button"
                                  src={"/svg/icon/close.svg"}
                                  width={18}
                                  height={18}
                                  variant="normal"
                                  size="xs"
                                  onClick={handleRemoveAllFiles}
                                />
                              )}
                            </div>
                          </div>

                          {/* 등록된 파일이 없을 경우 */}
                          {!fileDetails || fileDetails.length === 0 ? (
                            <div className="px-4 py-3">
                              <p className="text-label-assistive pretendard-body-2">
                                등록된 파일이 없습니다.
                              </p>
                            </div>
                          ) : (
                            <div>
                              {/* 등록된 파일 목록 */}
                              {fileDetails?.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between px-4 py-3"
                                >
                                  <div className="flex w-[calc(100%-90px)] items-center">
                                    <div className="relative mr-2.5 size-6 overflow-hidden rounded-[2px]">
                                      {!file.name
                                        .toLowerCase()
                                        .endsWith(".pdf") && (
                                        <Image
                                          src={file.url}
                                          alt={file.name}
                                          fill
                                          className="object-cover"
                                        />
                                      )}
                                    </div>

                                    {/* 파일명 */}
                                    <p className="line-clamp-1 max-w-[calc(100%-100px)] overflow-hidden truncate text-label-normal pretendard-body-3">
                                      {file.name}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-x-6">
                                    {/* 용량 */}
                                    <p className="whitespace-nowrap text-label-normal pretendard-body-3">
                                      {formatBytes(file.size)}
                                    </p>

                                    {/* 삭제 버튼 */}
                                    <IconButton
                                      type="button"
                                      src={"/svg/icon/close.svg"}
                                      width={18}
                                      height={18}
                                      variant="normal"
                                      size="xs"
                                      onClick={() => handleRemoveFile(index)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 파일 업로드 인풋 */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => handleFileChange(e)}
                        />
                      </div>

                      {/* 오류 메시지 */}
                      {errorMessage && (
                        <p className="mt-2 text-error pretendard-body-2">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 태그 키워드 필드 */}
                  {selectedCategory !== POST_CATEGORY_VALUES.DX && (
                    <TagKeyword form={form} />
                  )}

                  {/* 링크 연결(DX) */}
                  {selectedCategory === POST_CATEGORY_VALUES.DX && (
                    <div className="flex flex-col web:mt-0 web:flex-row web:gap-y-0">
                      <div className="web:flex web:w-[453px] web:items-end">
                        {/* 링크 연결 필드 */}
                        <CustomInputField
                          form={form}
                          name="linkUrl"
                          label="링크 연결"
                          isEssential
                          noIcon
                          placeholder="링크를 해당 링크로 이동할 URL을 입력해주세요."
                          className="h-[57px] p-4 placeholder:text-gray-40 web:mb-0 web:rounded-r-none"
                        />

                        {/* 링크 확인 버튼 */}
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

                  {/* 모바일 버튼 */}
                  <Button
                    size="cta"
                    className="mt-4 h-14 w-full web:hidden"
                    onClick={handleSubmit}
                    disabled={isUpdating}
                  >
                    수정하기
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

export default EditPostClient;
