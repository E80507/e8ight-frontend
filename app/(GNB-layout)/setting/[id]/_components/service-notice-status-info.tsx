import formattedDate from "@/util/date";
import FilterName from "@/app/_components/table/filter-name";
import ShortRow from "@/app/_components/table/short-row";
import { ServiceNoticePatchReq, ServiceNoticeRes } from "@/app/api/dto/setting";
import { UseFormReturn } from "react-hook-form";
import CustomRadioField from "@/components/shared/form/custom-radio-field";

interface ServiceNoticeStatusInfoProps {
  data: ServiceNoticeRes;
  form: UseFormReturn<ServiceNoticePatchReq>;
}

const ServiceNoticeStatusInfo = ({
  data,
  form,
}: ServiceNoticeStatusInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">서비스 공지 상태 정보</p>
      <div className="w-full shrink-0">
        <div className={`flex border-x border-t`}>
          <FilterName size="md" name={"처리 상태"} />
          <div className="flex items-center px-5 text-black">
            <CustomRadioField
              defaultValue={String(data.isVisible)}
              form={form}
              name={"isVisible"}
              radioValue={[
                { value: "false", text: "비노출" },
                { value: "true", text: "노출" },
              ]}
              direction={"horizontal"}
            />
          </div>
        </div>
        <ShortRow size="md" isLastRow label="처리 진행일" value={""}>
          {data.statusUpdatedAt ? (
            <p className="flex items-center gap-2">
              <span>{formattedDate(data.statusUpdatedAt, "DEFAULT_FULL")}</span>
              <span className="text-[#2A67FF]">
                {formattedDate(data.statusUpdatedAt)}
              </span>
            </p>
          ) : (
            "-"
          )}
        </ShortRow>
      </div>
    </div>
  );
};
export default ServiceNoticeStatusInfo;
