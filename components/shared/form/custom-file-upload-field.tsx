import { formatBytes } from "@/util/file";
import Image from "next/image";

interface FileInfo {
  id: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
}

interface CustomFileUploadFieldProps {
  label?: string;
  isEssential?: boolean;
  files?: FileInfo[];
}

const CustomFileUploadField = ({
  label,
  isEssential,
  files,
}: CustomFileUploadFieldProps) => {
  return (
    <div>
      {label && (
        <label className="mb-[12px] block pretendard-subtitle-m">
          {label}
          {isEssential && <span className="ml-[2px] text-error">{`*`}</span>}
        </label>
      )}

      <div className="border-line overflow-hidden rounded-[12px] border">
        <div className="flex h-[45px] items-center justify-between bg-background-natural px-[16px] py-[12px]">
          <div>파일명</div>
          <div>용량</div>
        </div>

        {files && files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="flex h-[45px] items-center justify-between px-[16px] py-[12px]">
              <div className="flex items-center gap-[10px]">
                <div className="relative size-[24px] overflow-hidden rounded-[2px]">
                  <Image
                    src={file.fileUrl}
                    alt={file.fileName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pretendard-body-3">{file.fileName}</div>
              </div>

              <div className="text-label-normal body-3">{formatBytes(file.fileSize)}</div>
            </div>
          ))
        ) : (
          <div className="flex h-[45px] items-center justify-between px-[16px] py-[12px]">
            <div className="text-label-assistive body-2">등록된 파일이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFileUploadField;
