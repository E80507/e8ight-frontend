"use client";

import { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
import { Button, IconButton } from "@/components/ui/button";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { usePostS3PresignedUrl } from "@/hooks/s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { POST_CATEGORY_VALUES } from "@/constants/admin";

type ThumbnailUploaderProps = {
  name: string;
  category: PostCategory;
};

const ThumbnailUploader = ({ name, category }: ThumbnailUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // 초기 썸네일 URL 감시
  const thumbnailUrl = watch(name);
  useEffect(() => {
    if (thumbnailUrl && typeof thumbnailUrl === "string") {
      setPreview(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      setLocalError("파일 크기는 최대 10MB까지 가능합니다.");
      return;
    }

    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      setPreview(objectUrl);
      try {
        const urls = await onPostS3PresignedUrl([file]);
        setValue("thumbnail", urls[0], {
          shouldValidate: true,
        });
      } catch (error) {
        setLocalError("파일 업로드에 실패했습니다.");
        console.error(error);
      }
    };

    img.onerror = () => {
      setLocalError("이미지를 불러오는 데 실패했습니다.");
    };

    img.src = objectUrl;
  };

  return (
    <div className="flex flex-col gap-y-2">
      <FormControl>
        <div>
          <FormLabel htmlFor={name} className="pretendard-subtitle-m">
            썸네일
          </FormLabel>
          <div
            className={`relative mt-3 w-full rounded-md bg-background-alternative ${
              preview ? "min-h-[290px] px-4 py-10" : "h-[225px]"
            }`}
          >
            {preview ? (
              <div
                className={`relative size-full overflow-hidden rounded-md ${
                  category === POST_CATEGORY_VALUES.DX
                    ? "aspect-[1.42] tablet:aspect-[1.5] web:mx-auto web:aspect-[1.52] web:max-w-[500px]"
                    : ""
                }`}
              >
                <NextImage
                  src={preview}
                  alt="썸네일 미리보기"
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, (max-width: 1025px) 50vw, 33vw"
                />
                <IconButton
                  className="absolute right-1 top-1"
                  src="/svg/icon/circle-x.svg"
                  width={24}
                  height={24}
                  onClick={() => {
                    setPreview(null);
                    setValue(name, null);
                    setLocalError("");
                  }}
                />
              </div>
            ) : (
              <div
                className={`flex size-full flex-col items-center justify-center rounded-md ${
                  errors[name] ? "border-2 border-error" : ""
                }`}
              >
                <Button
                  size="lg"
                  className="z-10 w-[97px]"
                  variant="outline"
                  onClick={handleButtonClick}
                  type="button"
                >
                  사진 업로드
                </Button>
                <p className="z-10 mt-4 pretendard-body-2">
                  이미지를 업로드해주세요
                </p>
                <p className="z-10 mt-[9px] text-center text-label-alternative pretendard-body-2">
                  권장 비율 : 16:7 (1600x700 / 1200x525)
                  <br />
                  최대 10MB의 JPG, JPEG, PNG, WEBP 파일
                </p>
              </div>
            )}
          </div>
          <input
            id={name}
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            onChange={handleFileChange}
          />
        </div>
      </FormControl>

      {localError ? (
        <p className="px-2 text-destructive caption">{localError}</p>
      ) : (
        <FormMessage>{errors[name]?.message as string}</FormMessage>
      )}
    </div>
  );
};

export default ThumbnailUploader;
