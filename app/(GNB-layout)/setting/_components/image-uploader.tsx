import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface ImageUploaderProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  savedFile?: string;
}
const ImageUploader = <T extends FieldValues>({
  form,
  name,
  savedFile,
}: ImageUploaderProps<T>) => {
  const [file, setFile] = useState<File | null>(null);

  // 파일 선택 핸들러
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      const acceptedTypes = ["image/png", "image/jpg", "image/jpeg"];

      // 지원하지 않는 파일 형식일 경우
      if (!acceptedTypes.includes(newFile.type)) {
        return toast({
          title: "지원하지 않는 파일 형식이에요",
        });
      }

      if (newFile.size > 30 * 1024 * 1024) {
        return toast({
          title: `파일 용량이 제한 크기(30MB)를 초과했어요`,
        });
      }

      setFile(newFile);
      form.setValue(name, newFile as PathValue<T, Path<T>>);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {savedFile && !file ? (
        <div className="relative size-[200px] border">
          <Image src={savedFile} alt="공지 이미지" fill />
        </div>
      ) : (
        file && (
          <div className="relative size-[200px] border">
            <Image src={URL.createObjectURL(file)} alt="공지 이미지" fill />
          </div>
        )
      )}
      <div className="relative">
        <div className="flex rounded-md border border-black/10">
          <p
            className={`flex w-full items-center border-r px-4 py-3 body-2 ${file ? "" : "text-[#8B909C]"}`}
          >
            {file ? file.name : `이미지를 업로드해주세요 (최대 30MB)`}
          </p>
          <button className="max-w-max shrink-0 px-4 py-3 subtitle-2">
            이미지 업로드
          </button>
        </div>
        <input
          accept="png, jpg, jpeg"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={onFileChange}
          type="file"
        />
      </div>
    </div>
  );
};
export default ImageUploader;
