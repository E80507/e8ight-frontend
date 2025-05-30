import { ArtworkDetailRes } from "@/app/api/dto/artwork";
import { Form } from "@/components/ui/form";
import ArtworkBasicInfo from "./artwork-basic-info";
import ArtworkDetailInfo from "./artwork-detail-info";
import ArtworkStatusInfo from "./artwork-status-info";
import { RefObject } from "react";
import { usePatchArtwork } from "@/hooks/artwork/use-patch-artwork";

interface ArtworkFormProps {
  id: string;
  data: ArtworkDetailRes;
  formRef: RefObject<HTMLFormElement>;
}
const ArtworkForm = ({ id, data, formRef }: ArtworkFormProps) => {
  const { form, onSubmit } = usePatchArtwork(id, data.isBlocked);
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <ArtworkBasicInfo data={data} />
        <ArtworkDetailInfo data={data} />
        <ArtworkStatusInfo data={data} form={form} />
      </form>
    </Form>
  );
};
export default ArtworkForm;
