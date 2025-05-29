interface CustomFileUploadFieldProps {
  label?: string;
  isEssential?: boolean;
}

const CustomFileUploadField = ({
  label,
  isEssential
}: CustomFileUploadFieldProps) => {
  return (
    <div>
      {label && (
        <label className= "button-m-cta web:subtitle-1 mb-[12px] block"> 
          {label}
          {isEssential && (
            <span className="ml-[2px] text-error">{`*`}</span>
          )}
        </label>
      )}

      <div className="border border-line rounded-[12px] overflow-hidden">
        <div className="flex items-center justify-between h-[45px] bg-background-natural px-[16px] py-[12px]">
          <div>파일명</div>
          <div>용량</div>
        </div>

        <div className="flex items-center justify-between h-[45px] px-[16px] py-[12px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[24px] h-[24px] rounded-[2px] bg-background-natural"></div>
            <div className="body-3">파일 제목이 들어갑니다.</div>
          </div>
          
          <div className="body-3 text-label-normal">1.93MB</div>
        </div>
      </div>
    </div>
  )
}

export default CustomFileUploadField;