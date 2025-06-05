interface CustomFileUploadFieldProps {
  label?: string;
  isEssential?: boolean;
}

const CustomFileUploadField = ({
  label,
  isEssential,
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

        <div className="flex h-[45px] items-center justify-between px-[16px] py-[12px]">
          <div className="flex items-center gap-[10px]">
            <div className="size-[24px] rounded-[2px] bg-background-natural"></div>
            <div className="body-3">파일 제목이 들어갑니다.</div>
          </div>

          <div className="text-label-normal body-3">1.93MB</div>
        </div>
      </div>
    </div>
  );
};

export default CustomFileUploadField;
